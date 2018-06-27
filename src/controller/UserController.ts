"use strict";

import * as _ from "lodash";
import * as restify from "restify";

import AbstractController from "./AbstractController";

import AuthService from "../backend/auth/AuthService";
import ChartService from "../backend/chart/ChartService";
import LoginService from "../backend/chart/LoginService";
import DeveloperService from "../backend/market/DeveloperService";
import GameService from "../backend/market/GameService";
import UserService from "../backend/social/UserService";
import TwitchService from "../backend/twitch/TwitchService";

import IAppResponse from "../backend/auth/interface/AppResponse";
import ITwitchTokenAuthRequest from "../backend/auth/interface/ITwitchTokenAuthRequest";
import IUserAuthRequest from "../backend/auth/interface/UserAuthRequest";
import IUserAuthResponse from "../backend/auth/interface/UserAuthResponse";
import ILoginResponse, {ILoginPaginated} from "../backend/chart/interface/LoginResponse";
import IUserRegRequest from "../backend/interface/IUserRegRequest";
import IDeveloperRequest from "../backend/market/interface/IDeveloperRequest";
import IDeveloperResponse from "../backend/market/interface/IDeveloperResponse";
import IGameResponse, {IGamePaginated} from "../backend/market/interface/IGameResponse";
import IServerResponse from "../backend/platform/interface/IServerResponse";
import IUserSocialRequest from "../backend/social/interface/IUserSocialRequest";
import IUserSocialResponse, {IUserSocialPaginated} from "../backend/social/interface/IUserSocialResponse";
import ITwitchTokenResponse from "../backend/twitch/interface/ITwitchTokenResponse";

export default class UserController extends AbstractController {

    public static async getUsers(req: restify.Request, res: restify.Response, next: restify.Next) {
        const page: number = parseInt(req.query.page, 10) || 0;
        const size: number = parseInt(req.query.size, 10) || 25;
        const username: string = req.query.username;
        try {
            // Get user from social service
            let usersSocialResponse: IUserSocialPaginated = null;
            if (username) {
                usersSocialResponse = await UserService.getUsers(page, size, username);
            } else {
                usersSocialResponse = await UserService.getUsers(page, size);
            }
            // Get users from auth service
            const userResponsePromises: Array<Promise<IUserAuthResponse>> = [];
            usersSocialResponse.content.forEach((user) => {
                userResponsePromises.push(AuthService.getUserById(user.id));
            });
            // Combine responses
            const usersResponse = usersSocialResponse;
            const usersAuthResponse = await Promise.all(userResponsePromises);
            usersResponse.content  = _.map(usersSocialResponse.content, (item) => {
                return _.assign(item, _.find(usersAuthResponse, ["id", item.id]));
            });
            res.json(usersResponse);
            return next();
        } catch (error) {
            UserController.errorResponse(error, res, next, `UserService { getUsers } error`);
        }
    }

    public static async createUser(req: restify.Request, res: restify.Response, next: restify.Next) {
        const userRequest: IUserRegRequest = req.body;
        try {
            // Set regDate to now if not set
            if (userRequest.regDate === undefined) { userRequest.regDate = Date.now().valueOf(); }
            // Set role to USER if not set
            if (userRequest.role === undefined) { userRequest.role = "USER"; }
            // Create user in social service
            const userSocialResponse: IUserSocialResponse = await UserService.createUser(userRequest as IUserSocialRequest);
            // Create user in auth service
            const userAuthResponse: IUserAuthResponse = await AuthService.createUser(userRequest as IUserAuthRequest);
            res.json(201, {...userSocialResponse, ...userAuthResponse});
            return next();
        } catch (error) {
            UserController.errorResponse(error, res, next, `UserService { createUser } error`);
        }
    }

    public static async authUserByTwitch(req: restify.Request, res: restify.Response, next: restify.Next) {
        const code: string = req.body.code;
        try {
            // Get twitch access token
            const token: ITwitchTokenResponse = await TwitchService.getAccessToken(code);
            // Get twitch user by access token
            const twitchUserResponse = await TwitchService.getUserByAccessToken(token.access_token);
            // Find user with same username
            const userExistsResponse = await UserService.getUserBy({username: twitchUserResponse.name});
            if (userExistsResponse === undefined) {
                // If user doesn't exist create new one
                // Create user in social service
                const userSocialRequest: IUserSocialRequest = {
                    avatar: twitchUserResponse.logo,
                    regEmail: twitchUserResponse.email,
                    username: twitchUserResponse.name,
                };
                const userSocialResponse: IUserSocialResponse = await UserService.createUser(userSocialRequest);
                // Create user in auth service
                const userAuthRequest: IUserAuthRequest = {
                    id: userSocialResponse.id,
                    password: token.access_token,
                    role: "USER",
                    username: userSocialResponse.username,
                };
                const userAuthResponse: IUserAuthResponse = await AuthService.createUser(userAuthRequest);
                // Save twitch token of user
                const tokenAuthRequest: ITwitchTokenAuthRequest = {
                    accessToken: token.access_token,
                    expiresIn: token.expires_in,
                    refreshToken: token.refresh_token,
                    scope: token.scope.toString(),
                    twitchId: twitchUserResponse._id,
                };
                await AuthService.createTwitchToken(userSocialResponse.id, tokenAuthRequest);
                // Return created user
                res.json(201, {...userSocialResponse, ...userAuthResponse, new: true});
            } else {
                // Else update existing one
                const userAuthResponse = await AuthService.getUserById(userExistsResponse.id);
                // Update his access token by new code
                const tokenAuthRequest: ITwitchTokenAuthRequest = {
                    accessToken: token.access_token,
                    expiresIn: token.expires_in,
                    refreshToken: token.refresh_token,
                    scope: token.scope.toString(),
                    twitchId: twitchUserResponse._id,
                };
                await AuthService.updateTwitchToken(userExistsResponse.id, tokenAuthRequest);
                res.json(200, {...userExistsResponse, ...userAuthResponse, new: false});
            }
            return next();
        } catch (error) {
            UserController.errorResponse(error, res, next, `UserService { createUserByTwitch: code = ${code} } error`);
        }
    }

    public static async getUserById(req: restify.Request, res: restify.Response, next: restify.Next) {
        const userId: string = req.params.userId;
        try {
            // Get user from social service
            const userSocialResponse: IUserSocialResponse = await UserService.getUserById(userId);
            // Get user from auth service
            const userAuthResponse: IUserAuthResponse = await AuthService.getUserById(userId);
            // Send both responses
            res.json({...userSocialResponse, ...userAuthResponse});
            return next();
        } catch (error) {
            UserController.errorResponse(error, res, next, `UserService { getUser: userId = ${userId}} error`);
        }
    }

    public static async getUserBy(req: restify.Request, res: restify.Response, next: restify.Next) {
        const username: string = req.query.username;
        const email: string = req.query.email;
        if (username) {
            try {
                const userSocialResponse: IUserSocialResponse = await UserService.getUserBy({username});
                const userAuthResponse: IUserAuthResponse = await AuthService.getUserById(userSocialResponse.id);
                const userResponse = {...userSocialResponse, ...userAuthResponse};
                res.json(userResponse);
                return next();
            } catch (error) {
                UserController.errorResponse(error, res, next, `UserService { getUserBy: username = ${username}} error`);
            }
        } else {
            try {
                const userSocialResponse = await UserService.getUserBy({email});
                const userAuthResponse: IUserAuthResponse = await AuthService.getUserById(userSocialResponse.id);
                const userResponse = {...userSocialResponse, ...userAuthResponse};
                res.json(userResponse);
                return next();
            } catch (error) {
                UserController.errorResponse(error, res, next, `UserService { getUserBy: email = ${email}} error`);
            }
        }
    }

    public static async getUserByTwitchToken(req: restify.Request, res: restify.Response, next: restify.Next) {
        const accessToken: string = req.body.accessToken;
        try {
            const twitchUserResponse = await TwitchService.getUserByAccessToken(accessToken);
            res.json(201, twitchUserResponse);
            return next();
        } catch (error) {
            UserController.errorResponse(error, res, next, `UserService { createUserByTwitch: code = ${accessToken} } error`);
        }
    }

    public static async updateUserById(req: restify.Request, res: restify.Response, next: restify.Next) {
        const userId: string = req.params.userId;
        const userRequest: IUserRegRequest = req.body;
        try {
            // Update user on social service
            const userSocialResponse: IUserSocialResponse = await UserService.updateUserById(userId, userRequest);
            // Update user on auth service
            const userAuthRequest: IUserAuthRequest = {
                id: userSocialResponse.id,
                role: userRequest.role,
                username: userSocialResponse.username,
            };
            const userAuthResponse: IUserAuthResponse = await AuthService.updateUserById(userId, userAuthRequest);
            res.json({...userSocialResponse, ...userAuthResponse});
            return next();
        } catch (error) {
            UserController.errorResponse(error, res, next, `UserService { updateUser: userId = ${userId} } error`);
        }
    }

    public static async updateUserCredentials(req: restify.Request, res: restify.Response, next: restify.Next) {
        const userId: string = req.params.userId;
        const credentials: IUserAuthRequest = req.body;
        try {
            const userResponse: IUserAuthResponse = await AuthService.updateUserCredentials(userId, credentials);
            res.json(userResponse);
            return next();
        } catch (error) {
            UserController.errorResponse(error, res, next, `UserService { updateCredentials: userId = ${userId} } error`);
        }
    }

    public static async deleteUserById(req: restify.Request, res: restify.Response, next: restify.Next) {
        const userId: string = req.params.userId;
        try {
            await UserService.deleteUserById(userId);
            await AuthService.deleteUser(userId);
            await ChartService.deleteUser(userId);
            res.send(204);
            return next();
        } catch (error) {
            UserController.errorResponse(error, res, next, `UserService { deleteUser: userId = ${userId} } error`);
        }
    }

    public static async getFriendsOfUserById(req: restify.Request, res: restify.Response, next: restify.Next) {
        const userId: string = req.params.userId;
        try {
            const usersResponse: IUserSocialResponse[] = await UserService.getFriends(userId);
            res.json(usersResponse);
            return next();
        } catch (error) {
            UserController.errorResponse(error, res, next, `UserService { getFriends: userId = ${userId} } error`);
        }
    }

    public static async addFriendToUserById(req: restify.Request, res: restify.Response, next: restify.Next) {
        const userId: string = req.params.userId;
        const friendId: string = req.params.friendId;
        try {
            await UserService.addFriend(userId, friendId);
            res.send(201);
            return next();
        } catch (error) {
            UserController.errorResponse(error, res, next, `UserService { addFriend: userId = ${userId}; friendId = ${friendId} } error`);
        }
    }

    public static async removeFriendFromUserById(req: restify.Request, res: restify.Response, next: restify.Next) {
        const userId: string = req.params.userId;
        const friendId: string = req.params.friendId;
        try {
            await UserService.removeFriend(userId, friendId);
            res.send(204);
            return next();
        } catch (error) {
            UserController.errorResponse(error, res, next, `UserService { removeFriend: userId = ${userId}; friendId = ${friendId} } error`);
        }
    }

    public static async getRelationOfUsersById(req: restify.Request, res: restify.Response, next: restify.Next) {
        const userAId: string = req.params.userAId;
        const userBId: string = req.params.userBId;
        try {
            const relationResponse = await UserService.getRelation(userAId, userBId);
            res.send(200, relationResponse);
            return next();
        } catch (error) {
            UserController.errorResponse(error, res, next, `UserService { addFriend: userAId = ${userAId}; userBId = ${userBId} } error`);
        }
    }

    public static async getGamesOfUserById(req: restify.Request, res: restify.Response, next: restify.Next) {
        const userId: string = req.params.userId;
        const page: number = parseInt(req.query.page, 10) || 0;
        const size: number = parseInt(req.query.size, 10) || 25;
        try {
            const gamesResponse: [string] = await UserService.getGames(userId, page, size);
            res.json(gamesResponse);
            return next();
        } catch (error) {
            UserController.errorResponse(error, res, next, `UserService { getGames: userId = ${userId} } error`);
        }
    }

    public static async addGameToUserById(req: restify.Request, res: restify.Response, next: restify.Next) {
        const userId: string = req.params.userId;
        const gameId: string = req.params.gameId;
        try {
            const gameResponse: IGameResponse = await GameService.getGameById(gameId);
            await UserService.addGameToUserById(userId, gameId);
            res.send(201, gameResponse);
            return next();
        } catch (error) {
            UserController.errorResponse(error, res, next, `UserService { addGameToUser: userId = ${userId}; gameId = ${gameId} } error`);
        }
    }

    public static async removeGamesOfUserById(req: restify.Request, res: restify.Response, next: restify.Next) {
        const userId: string = req.params.userId;
        const gameId: string = req.params.gameId;
        try {
            await UserService.removeGameOfUserById(userId, gameId);
            res.send(204);
            return next();
        } catch (error) {
            UserController.errorResponse(error, res, next, `UserService { removeGameToUser: userId = ${userId}; gameId = ${gameId} } error`);
        }
    }

    public static async getServerOfUserById(req: restify.Request, res: restify.Response, next: restify.Next) {
        const userId: string = req.params.userId;
        try {
            const serverResponse: IServerResponse = await UserService.getServerOfUserById(userId);
            res.json(serverResponse);
            return next();
        } catch (error) {
            UserController.errorResponse(error, res, next, `UserService { getServerOfUser: userId = ${userId} } error`);
        }
    }

    public static async getDeveloper(req: restify.Request, res: restify.Response, next: restify.Next) {
        const userId: string = req.params.userId;
        try {
            const developerResponse: IDeveloperResponse = await DeveloperService.getDeveloperBy({userId});
            res.json(developerResponse);
            return next();
        } catch (error) {
            UserController.errorResponse(error, res, next, `UserService { getDeveloper: userId = ${userId} } error`);
        }
    }

    public static async createDeveloper(req: restify.Request, res: restify.Response, next: restify.Next) {
        const userId: string = req.params.userId;
        const developerRequest: IDeveloperRequest = req.body;
        try {
            // Get user by id to check existence
            const userSocialResponse: IUserSocialResponse = await UserService.getUserById(userId);
            // Create developer on market service
            developerRequest.userId = userSocialResponse.id;
            const developerResponse: IDeveloperResponse = await DeveloperService.createDeveloper(developerRequest);
            // Change user's role to DEVELOPER on auth service
            const authRequest: IUserAuthRequest = {
                id: userSocialResponse.id,
                role: "DEVELOPER",
                username: userSocialResponse.username,
            };
            const userAuthResponse = await AuthService.updateUserById(userSocialResponse.id, authRequest);
            // Add user info to developer response
            developerResponse.user = {...userSocialResponse, userAuthResponse};
            res.json(developerResponse);
            return next();
        } catch (error) {
            UserController.errorResponse(error, res, next, `UserService { createDeveloper: userId = ${userId} } error`);
        }
    }

    public static async getAppsOfUserById(req: restify.Request, res: restify.Response, next: restify.Next) {
        const userId: string = req.params.userId;
        try {
            const appsResponse: IAppResponse[] = await AuthService.getAppsOfUser(userId);
            res.json(appsResponse);
            return next();
        } catch (error) {
            UserController.errorResponse(error, res, next, `UserService { getAppsOfUser: userId = ${userId} } error`);
        }
    }

    public static async getGamesOfDeveloper(req: restify.Request, res: restify.Response, next: restify.Next) {
        const userId: string = req.params.userId;
        try {
            const developerResponse: IDeveloperResponse = await DeveloperService.getDeveloperBy({userId});
            const gamesResponse: IGamePaginated = await DeveloperService.getGamesOfDeveloperById(developerResponse.id);
            res.json(gamesResponse);
            return next();
        } catch (error) {
            UserController.errorResponse(error, res, next, `UserService { getGamesOfDeveloper: userId = ${userId} } error`);
        }
    }

    public static async getLogins(req: restify.Request, res: restify.Response, next: restify.Next) {
        const userId: string = req.params.userId;
        try {
            const loginResponse: ILoginPaginated = await LoginService.getLoginsOfUser(userId);
            res.json(loginResponse);
            return next();
        } catch (error) {
            UserController.errorResponse(error, res, next, `UserService { getLogins: userId = ${userId} } error`);
        }
    }

    public static async getLatestLogin(req: restify.Request, res: restify.Response, next: restify.Next) {
        const userId: string = req.params.userId;
        try {
            const loginResponse: ILoginResponse = await LoginService.getLatestLoginOfUser(userId);
            res.json(loginResponse);
            return next();
        } catch (error) {
            UserController.errorResponse(error, res, next, `UserService { getLatestLogin: userId = ${userId} } error`);
        }
    }

}
