"use strict";

import * as restify from "restify";

import AuthController from "./controller/AuthController";
import ChannelController from "./controller/ChannelController";
import DeveloperController from "./controller/DeveloperController";
import GameController from "./controller/GameController";
import OAuthController from "./controller/OAuthController";
import ProviderController from "./controller/ProviderController";
import ServerController from "./controller/ServerController";
import UserController from "./controller/UserController";

export default function Router(server: restify.Server) {

    server.post("/test", UserController.getUserByTwitchToken);

    // AUTH
    server.post("/auth/login", AuthController.login);
    server.post("/auth/check", AuthController.check);
    server.post("/auth/refresh", AuthController.refresh);
    server.del("/auth/logout", AuthController.logout);

    server.post("/auth/oauth/app", OAuthController.createApp);
    server.get("/auth/oauth/app/:appId", OAuthController.getApp);
    server.del("/auth/oauth/app/:appId", OAuthController.deleteApp);

    server.post("/auth/oauth/login", OAuthController.login);
    server.post("/auth/oauth/token", OAuthController.getToken);
    server.post("/auth/oauth/token/refresh", OAuthController.refreshToken);
    server.post("/auth/oauth/token/check", OAuthController.checkToken);
    server.del("/auth/oauth/token", OAuthController.deleteToken);

    server.post("/auth/providers/twitch/users/:userId", ProviderController.createToken);
    server.get("/auth/providers/twitch/users/:userId", ProviderController.getToken);
    server.del("/auth/providers/twitch/users/:userId", ProviderController.deleteToken);

    // USERS
    server.get("/users", UserController.getUsers);
    server.post("/users", UserController.createUser);
    server.get("/users/by", UserController.getUserBy);
    server.get("/users/:userId", UserController.getUserById);
    server.patch("/users/:userId", UserController.updateUserById);
    server.patch("/users/:userId/credentials", UserController.updateUserCredentials);
    server.del("/users/:userId", UserController.deleteUserById);

    server.get("/users/:userId/friends", UserController.getFriendsOfUserById);
    server.post("/users/:userId/friends/:friendId", UserController.addFriendToUserById);
    server.del("/users/:userId/friends/:friendId", UserController.removeFriendFromUserById);
    server.get("/users/:userAId/relation/:userBId", UserController.getRelationOfUsersById);

    server.get("/users/:userId/games", UserController.getGamesOfUserById);
    server.post("/users/:userId/games/:gameId", UserController.addGameToUserById);
    server.del("/users/:userId/games/:gameId", UserController.removeGamesOfUserById);

    server.get("/users/:userId/servers", UserController.getServerOfUserById);

    server.get("/users/:userId/apps", UserController.getAppsOfUserById);

    server.post("/users/twitch", UserController.authUserByTwitch);

    server.get("/users/:userId/developer/games", UserController.getGamesOfDeveloper);

    // GAMES
    server.get("/games", GameController.getGames);
    server.post("/games", GameController.createGame);
    server.get("/games/by", GameController.getGameBy);
    server.get("/games/:gameId", GameController.getGameById);
    server.patch("/games/:gameId", GameController.updateGameById);
    server.del("/games/:gameId", GameController.deleteGameById);

    server.get("/games/:gameId/developers", GameController.getDevelopersOfGameById);

    server.get("/games/:gameId/users", GameController.getOwnersOfGameById);

    // DEVELOPERS
    server.get("/developers", DeveloperController.getDevelopers);
    server.post("/developers", DeveloperController.createDeveloper);
    server.get("/developers/by", DeveloperController.getDeveloperBy);
    server.get("/developers/:developerId", DeveloperController.getDeveloperById);
    server.patch("/developers/:developerId", DeveloperController.updateDeveloperById);
    server.del("/developers/:developerId", DeveloperController.deleteDeveloperById);

    server.get("/developers/:developerId/games", DeveloperController.getGamesOfDeveloperById);

    // CHANNELS
    server.get("/channels", ChannelController.getChannels);
    server.post("/channels", ChannelController.createChannel);
    server.get("/channels/by", ChannelController.getChannelBy);
    server.get("/channels/:channelId", ChannelController.getChannelById);
    server.patch("/channels/:channelId", ChannelController.updateChannelById);
    server.del("/channels/:channelId", ChannelController.deleteChannelById);

    // SERVERS
    server.get("/servers", ServerController.getServers);
    server.post("/servers", ServerController.createServer);
    server.get("/servers/by", ServerController.getServerBy);
    server.get("/servers/:serverId", ServerController.getServerById);
    server.patch("/servers/:serverId", ServerController.updateServerById);
    server.del("/servers/:serverId", ServerController.deleteServerById);

    server.get("/servers/:serverId/channel", ServerController.getChannelOfServiceById);

    server.get("/servers/:serverId/users", ServerController.getUsersOfServerById);
    server.post("/servers/:serverId/users/:userId", ServerController.addUsersToServerById);
    server.del("/servers/:serverId/users/:userId", ServerController.removeUsersFromServerById);

}
