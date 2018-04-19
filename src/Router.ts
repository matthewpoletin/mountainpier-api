"use strict";

import * as restify from "restify";

import AuthController from "./controller/AuthController";
import DeveloperController from "./controller/DeveloperController";
import GameController from "./controller/GameController";
import OAuthController from "./controller/OAuthController";
import UserController from "./controller/UserController";


export default function Router(server: restify.Server) {

    // AUTH
    server.post("/auth/login", AuthController.login);
    server.post("/auth/check", AuthController.check);
    server.post("/auth/refresh", AuthController.refresh);
    server.del("/auth/logout", AuthController.logout);

    server.get("/auth/oauth/app", OAuthController.createApp);
    server.get("/auth/oauth/app/:appId", OAuthController.getApp);

    server.post("/auth/oauth/login", OAuthController.login);
    server.post("/auth/oauth/token", OAuthController.getToken);
    server.post("/auth/oauth/token/refresh", OAuthController.refreshToken);
    server.post("/auth/oauth/token/check", OAuthController.checkToken);
    server.del("/auth/oauth/token", OAuthController.deleteToken);

    // USERS
    server.get("/users", UserController.getUsers);
    server.post("/users", UserController.createUser);
    server.get("/users/by", UserController.getUserBy);
    server.get("/users/:userId", UserController.getUserById);
    server.patch("/users/:userId", UserController.updateUserById);
    server.del("/users/:userId", UserController.deleteUserById);

    server.get("/users/:userId/friends", UserController.getFriends);

    server.get("/users/:userId/games", UserController.getGames);

    server.get("/games", GameController.getGames);
    server.post("/games", GameController.createGame);
    server.get("/games/by", GameController.getGameBy);
    server.get("/games/:gameId", GameController.getGameById);
    server.patch("/games/:gameId", GameController.updateGameById);
    server.del("/games/:gameId", GameController.deleteGameById);

    server.get("/games/:gameId/owners", GameController.getOwnersOfGameById);

    server.get("/games/:gameId/developers", GameController.getDevelopersOfGameById);

    server.get("/developers", DeveloperController.getDevelopers);
    server.post("/developers", DeveloperController.createDeveloper);
    server.get("/developers/by", DeveloperController.getDeveloperBy);
    server.get("/developers/:developerId", DeveloperController.getDeveloperById);
    server.patch("/developers/:developerId", DeveloperController.updateDeveloperById);
    server.del("/developers/:developerId", DeveloperController.deleteDeveloperById);

    server.get("/developers/:developerId/games", DeveloperController.getGamesOfDeveloperById);

}
