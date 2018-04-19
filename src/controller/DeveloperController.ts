"use strict";

import * as restify from "restify";

import AbstractController from "./AbstractController";

import DeveloperService from "../backend/market/DeveloperService";

import IDeveloperRequest from "../backend/market/interface/IDeveloperRequest";
import IDeveloperResponse from "../backend/market/interface/IDeveloperResponse";
import IDeveloperPaginated from "../backend/market/interface/IDeveloperResponse";
import {IGamePaginated} from "../backend/market/interface/IGameResponse";

export default class DeveloperController extends AbstractController {

    public static async getDevelopers(req: restify.Request, res: restify.Response, next: restify.Next) {
        const page: number = parseInt(req.query.page, 10) || 0;
        const size: number = parseInt(req.query.size, 10) || 25;
        const name: string = req.query.name;
        try {
            let developerResponses: IDeveloperPaginated = null;
            if (name) {
                developerResponses = await DeveloperService.getDevelopers(page, size, name);
            } else {
                developerResponses = await DeveloperService.getDevelopers(page, size);
            }
            res.json(developerResponses);
            return next();
        } catch (error) {
            DeveloperController.errorResponse(error, res, next, `DeveloperService { getDevelopers } error`);
        }
    }

    public static async createDeveloper(req: restify.Request, res: restify.Response, next: restify.Next) {
        const developerRequest: IDeveloperRequest = req.body;
        // TODO: check if developer with such name exists
        try {
            const developerResponse: IDeveloperResponse = await DeveloperService.createDeveloper(developerRequest);
            res.json(201, developerResponse);
            return next();
        } catch (error) {
            DeveloperController.errorResponse(error, res, next, `DeveloperService { createDeveloper } error`);
        }
    }

    public static async getDeveloperById(req: restify.Request, res: restify.Response, next: restify.Next) {
        const developerId: number = parseInt(req.params.developerId, 10);
        try {
            const developerResponse: IDeveloperResponse = await DeveloperService.getDeveloperById(developerId);
            res.json(developerResponse);
            return next();
        } catch (error) {
            DeveloperController.errorResponse(error, res, next, `DeveloperService { getDeveloper: developerId = ${developerId}} error`);
        }
    }

    public static async getDeveloperBy(req: restify.Request, res: restify.Response, next: restify.Next) {
        const developername: string = req.query.developername;
        const email: string = req.query.email;
        if (developername) {
            try {
                const developerResponse = await DeveloperService.getDeveloperBy({developername});
                res.json(developerResponse);
                return next();
            } catch (error) {
                DeveloperController.errorResponse(error, res, next, `DeveloperService { getDeveloperBy: developername = ${developername}} error`);
            }
        } else {
            try {
                const developerResponse = await DeveloperService.getDeveloperBy({email});
                res.json(developerResponse);
                return next();
            } catch (error) {
                DeveloperController.errorResponse(error, res, next, `DeveloperService { getDeveloperBy: email = ${email}} error`);
            }
        }
    }

    public static async updateDeveloperById(req: restify.Request, res: restify.Response, next: restify.Next) {
        const developerId: number = parseInt(req.params.developerId, 10);
        const developerRequest = req.body;
        try {
            const developerResponse: IDeveloperResponse = await DeveloperService.updateDeveloperById(developerId, developerRequest);
            res.json(developerResponse);
            return next();
        } catch (error) {
            DeveloperController.errorResponse(error, res, next, `DeveloperService { updateDeveloper: developerId = ${developerId} } error`);
        }
    }

    public static async deleteDeveloperById(req: restify.Request, res: restify.Response, next: restify.Next) {
        const developerId = parseInt(req.params.developerId, 10);
        try {
            await DeveloperService.deleteDeveloperById(developerId);
            res.send(204);
            return next();
        } catch (error) {
            DeveloperController.errorResponse(error, res, next, `DeveloperService { deleteDeveloper: developerId = ${developerId} } error`);
        }
    }

    public static async getGamesOfDeveloperById(req: restify.Request, res: restify.Response, next: restify.Next) {
        const developerId: number = parseInt(req.params.developerId, 10);
        const page: number = parseInt(req.query.page, 10) || 0;
        const size: number = parseInt(req.query.size, 10) || 25;
        try {
            const gamesResponse: IGamePaginated = await DeveloperService.getGamesOfDeveloperById(developerId, page, size);
            res.json(gamesResponse);
            return next();
        } catch (error) {
            DeveloperController.errorResponse(error, res, next, `DeveloperService { getGamesOfDeveloper: developerId = ${developerId} } error`);
        }
    }
}
