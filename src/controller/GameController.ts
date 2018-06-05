"use strict";

import * as restify from "restify";

import AbstractController from "./AbstractController";

import GameService from "../backend/market/GameService";

import IGameRequest from "../backend/market/interface/IGameRequest";
import IGameResponse from "../backend/market/interface/IGameResponse";
import IGamePaginated from "../backend/market/interface/IGameResponse";
import {IUserSocialPaginated} from "../backend/social/interface/IUserSocialResponse";
import {IDeveloperPaginated} from "../backend/market/interface/IDeveloperResponse";
import {IServerPaginated} from "../backend/platform/interface/IServerResponse";

export default class GameController extends AbstractController {

    public static async getGames(req: restify.Request, res: restify.Response, next: restify.Next) {
        const page: number = parseInt(req.query.page, 10) || 0;
        const size: number = parseInt(req.query.size, 10) || 25;
        const name: string = req.query.name;
        try {
            let gameResponses: IGamePaginated = null;
            if (name) {
                gameResponses = await GameService.getGames(page, size, name);
            } else {
                gameResponses = await GameService.getGames(page, size);
            }
            res.json(gameResponses);
            return next();
        } catch (error) {
            GameController.errorResponse(error, res, next, `GameService { getGames } error`);
        }
    }

    public static async createGame(req: restify.Request, res: restify.Response, next: restify.Next) {
        const gameRequest: IGameRequest = req.body;
        try {
            const gameResponse: IGameResponse = await GameService.createGame(gameRequest);
            res.json(201, gameResponse);
            return next();
        } catch (error) {
            GameController.errorResponse(error, res, next, `GameService { createGame } error`);
        }
    }

    public static async getGameById(req: restify.Request, res: restify.Response, next: restify.Next) {
        const gameId: string = req.params.gameId;
        try {
            const gameResponse: IGameResponse = await GameService.getGameById(gameId);
            res.json(gameResponse);
            return next();
        } catch (error) {
            GameController.errorResponse(error, res, next, `GameService { getGame: gameId = ${gameId}} error`);
        }
    }

    public static async getGameBy(req: restify.Request, res: restify.Response, next: restify.Next) {
        const name: string = req.query.name;
        const email: string = req.query.email;
        if (name) {
            try {
                const gameResponse = await GameService.getGameBy({name});
                res.json(gameResponse);
                return next();
            } catch (error) {
                GameController.errorResponse(error, res, next, `GameService { getGameBy: name = ${name}} error`);
            }
        } else {
            try {
                const gameResponse = await GameService.getGameBy({email});
                res.json(gameResponse);
                return next();
            } catch (error) {
                GameController.errorResponse(error, res, next, `GameService { getGameBy: email = ${email}} error`);
            }
        }
    }

    public static async updateGameById(req: restify.Request, res: restify.Response, next: restify.Next) {
        const gameId: string = req.params.gameId;
        const gameRequest = req.body;
        try {
            const gameResponse: IGameResponse = await GameService.updateGameById(gameId, gameRequest);
            res.json(gameResponse);
            return next();
        } catch (error) {
            GameController.errorResponse(error, res, next, `GameService { updateGame: gameId = ${gameId} } error`);
        }
    }

    public static async deleteGameById(req: restify.Request, res: restify.Response, next: restify.Next) {
        const gameId: string = req.params.gameId;
        try {
            await GameService.deleteGameById(gameId);
            res.send(204);
            return next();
        } catch (error) {
            GameController.errorResponse(error, res, next, `GameService { deleteGame: gameId = ${gameId} } error`);
        }
    }

    public static async getDevelopersOfGameById(req: restify.Request, res: restify.Response, next: restify.Next) {
        const gameId: string = req.params.gameId;
        const page: number = parseInt(req.query.page, 10) || 0;
        const size: number = parseInt(req.query.size, 10) || 25;
        try {
            const developersResponse: IDeveloperPaginated = await GameService.getDevelopersOfGame(gameId, page, size);
            res.send(developersResponse);
            return next();
        } catch (error) {
            GameController.errorResponse(error, res, next, `GameService { getDevelopers: gameId = ${gameId} } error`);
        }
    }

    public static async setDeveloperOfGame(req: restify.Request, res: restify.Response, next: restify.Next) {
        const gameId: string = req.params.gameId;
        const developerId: number = parseInt(req.params.developerId, 10);
        try {
            const gameResponse: IGameResponse = await GameService.setDeveloperOfGame(gameId, developerId);
            res.send(gameResponse);
            return next();
        } catch (error) {
            GameController.errorResponse(error, res, next, `GameService { setDeveloper: gameId = ${gameId} } error`);
        }
    }

    public static async getOwnersOfGameById(req: restify.Request, res: restify.Response, next: restify.Next) {
        const gameId: string = req.params.gameId;
        const page: number = parseInt(req.query.page, 10) || 0;
        const size: number = parseInt(req.query.size, 10) || 25;
        try {
            const usersResponse: IUserSocialPaginated = await GameService.getOwnersOfGameById(gameId, page, size);
            res.send(usersResponse);
            return next();
        } catch (error) {
            GameController.errorResponse(error, res, next, `GameService { getOwnersOfGame: gameId = ${gameId} } error`);
        }
    }

    public static async getServersOfGameById(req: restify.Request, res: restify.Response, next: restify.Next) {
        const gameId: string = req.params.gameId;
        try {
            const gameResponse: IGameResponse = await GameService.getGameById(gameId);
            const serversResponse: IServerPaginated = await GameService.getServersOfGame(gameResponse.id);
            res.send(serversResponse);
            return next();
        } catch (error) {
            GameController.errorResponse(error, res, next, `GameService { getServers: gameId = ${gameId} } error`);
        }
    }

}
