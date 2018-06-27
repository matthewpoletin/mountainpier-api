"use strict";

import * as _ from "lodash";
import * as restify from "restify";

import AbstractController from "./AbstractController";

import DeveloperService from "../backend/market/DeveloperService";

import IDeveloperRequest from "../backend/market/interface/IDeveloperRequest";
import IDeveloperResponse, {IDeveloperPaginated} from "../backend/market/interface/IDeveloperResponse";
import {IGamePaginated} from "../backend/market/interface/IGameResponse";
import IUserSocialResponse from "../backend/social/interface/IUserSocialResponse";
import UserService from "../backend/social/UserService";

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
            try {
                const userResponsePromises: Array<Promise<IUserSocialResponse>> = [];
                developerResponses.content.forEach((user) => {
                    userResponsePromises.push(UserService.getUserById(user.userId));
                });
                const usersSocialResponse = await Promise.all(userResponsePromises);
                developerResponses.content = _.map(developerResponses.content, (item) => {
                    item.user = _.find(usersSocialResponse, ["id", item.userId]);
                    delete item.userId;
                    return item;
                });
            } catch (error) {
                // DeveloperController.errorResponse(error, res, next, `DeveloperService { getDevelopers } error`);
            }
            res.json(developerResponses);
            return next();
        } catch (error) {
            DeveloperController.errorResponse(error, res, next, `DeveloperService { getDevelopers } error`);
        }
    }

    public static async createDeveloper(req: restify.Request, res: restify.Response, next: restify.Next) {
        const developerRequest: IDeveloperRequest = req.body;
        try {
            const userSocialResponse: IUserSocialResponse = await UserService.getUserById(developerRequest.userId);
            const developerResponse: IDeveloperResponse = await DeveloperService.createDeveloper(developerRequest);
            developerResponse.user = userSocialResponse;
            delete developerResponse.userId;
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
            try {
                developerResponse.user = await UserService.getUserById(developerResponse.userId);
                delete developerResponse.userId;
            } catch (error) {
                // DeveloperController.errorResponse(error, res, next, `DeveloperService { getDeveloper: developerId = ${developerId}} error`);
            }
            res.json(developerResponse);
            return next();
        } catch (error) {
            DeveloperController.errorResponse(error, res, next, `DeveloperService { getDeveloper: developerId = ${developerId}} error`);
        }
    }

    public static async getDeveloperBy(req: restify.Request, res: restify.Response, next: restify.Next) {
        const developerName: string = req.query.name;
        const email: string = req.query.email;
        if (developerName) {
            try {
                const developerResponse = await DeveloperService.getDeveloperBy({name: developerName});
                res.json(developerResponse);
                return next();
            } catch (error) {
                DeveloperController.errorResponse(error, res, next, `DeveloperService { getDeveloperBy: developerName = ${developerName}} error`);
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
