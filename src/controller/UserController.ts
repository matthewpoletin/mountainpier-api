"use strict";

import * as restify from "restify";

import AbstractController from "./AbstractController";

import AuthService from "../backend/auth/AuthService";
import GameService from "../backend/market/GameService";
import UserService from "../backend/social/UserService";

import IAppResponse from "../backend/auth/interface/AppResponse";
import IUserAuthRequest from "../backend/auth/interface/UserAuthRequest";
import IUserAuthResponse from "../backend/auth/interface/UserAuthResponse";
import IGameResponse from "../backend/market/interface/IGameResponse";
import IServerResponse from "../backend/platform/interface/IServerResponse";
import IUserResponse from "../backend/social/interface/IUserResponse";
import IUserPaginated from "../backend/social/interface/IUserResponse";

export default class UserController extends AbstractController {

    public static async getUsers(req: restify.Request, res: restify.Response, next: restify.Next) {
        const page: number = parseInt(req.query.page, 10) || 0;
        const size: number = parseInt(req.query.size, 10) || 25;
        const username: string = req.query.username;
        try {
            let userResponses: IUserPaginated = null;
            if (username) {
                userResponses = await UserService.getUsers(page, size, username);
            } else {
                userResponses = await UserService.getUsers(page, size);
            }
            res.json(userResponses);
            return next();
        } catch (error) {
            UserController.errorResponse(error, res, next, `UserService { getUsers } error`);
        }
    }

    public static async createUser(req: restify.Request, res: restify.Response, next: restify.Next) {
        const userRequest = req.body;
        try {
            const userResponse: IUserResponse = await UserService.createUser(userRequest);
            const userAuthRequest: IUserAuthRequest = {
                id: userResponse.id,
                password: userRequest.password,
                role: userRequest.role,
                username: userResponse.username,
            };
            userAuthRequest.id = userResponse.id;
            const userAuthResponse: IUserAuthResponse = await AuthService.createUser(userAuthRequest);
            res.json(201, {...userResponse, ...userAuthResponse});
            return next();
        } catch (error) {
            UserController.errorResponse(error, res, next, `UserService { createUser } error`);
        }
    }

    public static async getUserById(req: restify.Request, res: restify.Response, next: restify.Next) {
        const userId: string = req.params.userId;
        try {
            const userResponse: IUserResponse = await UserService.getUserById(userId);
            res.json(userResponse);
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
                const userResponse = await UserService.getUserBy({username});
                res.json(userResponse);
                return next();
            } catch (error) {
                UserController.errorResponse(error, res, next, `UserService { getUserBy: username = ${username}} error`);
            }
        } else {
            try {
                const userResponse = await UserService.getUserBy({email});
                res.json(userResponse);
                return next();
            } catch (error) {
                UserController.errorResponse(error, res, next, `UserService { getUserBy: email = ${email}} error`);
            }
        }
    }

    public static async updateUserById(req: restify.Request, res: restify.Response, next: restify.Next) {
        const userId: string = req.params.userId;
        const userRequest = req.body;
        try {
            const userResponse: IUserResponse = await UserService.updateUserById(userId, userRequest);
            res.json(userResponse);
            return next();
        } catch (error) {
            UserController.errorResponse(error, res, next, `UserService { updateUser: userId = ${userId} } error`);
        }
    }

    public static async deleteUserById(req: restify.Request, res: restify.Response, next: restify.Next) {
        const userId: string = req.params.userId;
        try {
            await UserService.deleteUserById(userId);
            res.send(204);
            return next();
        } catch (error) {
            UserController.errorResponse(error, res, next, `UserService { deleteUser: userId = ${userId} } error`);
        }
    }

    public static async getFriendsOfUserById(req: restify.Request, res: restify.Response, next: restify.Next) {
        const userId: string = req.params.userId;
        try {
            const usersResponse: IUserResponse[] = await UserService.getFriends(userId);
            res.json(usersResponse);
            return next();
        } catch (error) {
            UserController.errorResponse(error, res, next, `UserService { getFriends: userId = ${userId} } error`);
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
            res.send(201);
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

}
