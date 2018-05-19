"use strict";

import * as restify from "restify";

import AbstractController from "./AbstractController";

import providerService from "../backend/auth/ProviderService";

import IProviderTokenRequest from "../backend/auth/interface/ProviderTokenRequest";
import IProviderTokenResponse from "../backend/auth/interface/ProviderTokenResponse";

export default class ProviderController extends AbstractController {

    public static async createToken(req: restify.Request, res: restify.Response, next: restify.Next) {
        const userId: string = req.params.userId;
        const tokenRequest: IProviderTokenRequest = req.body;
        try {
            const tokenResponse: IProviderTokenResponse = await providerService.createToken(userId, tokenRequest);
            return res.json(201, tokenResponse);
        } catch (error) {
            ProviderController.errorResponse(error, res, next, `ProviderService { createToken } error`);
        }
    }

    public static async getToken(req: restify.Request, res: restify.Response, next: restify.Next) {
        const userId: string = req.params.userId;
        try {
            const authResponse = await providerService.getToken(userId);
            return res.json(200, authResponse);
        } catch (error) {
            ProviderController.errorResponse(error, res, next, `ProviderService { getToken } error`);
        }
    }

    public static async deleteToken(req: restify.Request, res: restify.Response, next: restify.Next) {
        const userId: string = req.params.userId;
        try {
            const authResponse = await providerService.deleteToken(userId);
            return res.json(204, authResponse);
        } catch (error) {
            ProviderController.errorResponse(error, res, next, `ProviderService { deleteToken } error`);
        }
    }

}
