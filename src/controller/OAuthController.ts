"use strict";

import * as restify from "restify";

import AbstractController from "./AbstractController";

import authService from "../backend/auth/AuthService";

import IAppRequest from "../backend/auth/interface/AppRequest";
import IAppResponse, {IAppPaginated} from "../backend/auth/interface/AppResponse";
import IGetTokenRequest from "../backend/auth/interface/GetTokenRequest";
import IOAuthLoginRequest from "../backend/auth/interface/OAuthLoginRequest";
import IOAuthLoginResponse from "../backend/auth/interface/OAuthLoginResponse";
import IRefreshRequest from "../backend/auth/interface/RefreshRequest";
import ITokenRequest from "../backend/auth/interface/TokenRequest";
import ITokenResponse from "../backend/auth/interface/TokenResponse";
import IUserAuthResponse from "../backend/auth/interface/UserAuthResponse";

export default class OAuthController extends AbstractController {

    public static async getApps(req: restify.Request, res: restify.Response, next: restify.Next) {
        const page: number = parseInt(req.query.page, 10) || 0;
        const size: number = parseInt(req.query.size, 10) || 25;
        try {
            const appResponse: IAppPaginated = await authService.getApps(page, size);
            res.json(appResponse);
            return next();
        } catch (error) {
            OAuthController.errorResponse(error, res, next, `OAuthService { getApps } error`);
        }
    }

    public static async createApp(req: restify.Request, res: restify.Response, next: restify.Next) {
        const appRequest: IAppRequest = req.body;
        try {
            const appResponse: IAppResponse = await authService.createApp(appRequest);
            res.json(201, appResponse);
            return next();
        } catch (error) {
            OAuthController.errorResponse(error, res, next, `OAuthService { createApp } error`);
        }
    }

    public static async getApp(req: restify.Request, res: restify.Response, next: restify.Next) {
        const appId: number = parseInt(req.params.appId, 10);
        try {
            const appResponse: IAppResponse = await authService.getApp(appId);
            res.send(appResponse);
            return next();
        } catch (error) {
            OAuthController.errorResponse(error, res, next, `OAuthService { getApp: appId = ${appId} } error`);
        }
    }

    public static async updateApp(req: restify.Request, res: restify.Response, next: restify.Next) {
        const appId: number = parseInt(req.params.appId, 10);
        const appRequest: IAppRequest = req.body;
        try {
            const appResponse: IAppResponse = await authService.updateApp(appId, appRequest);
            res.send(appResponse);
            return next();
        } catch (error) {
            OAuthController.errorResponse(error, res, next, `OAuthService { updateApp: appId = ${appId} } error`);
        }
    }

    public static async deleteApp(req: restify.Request, res: restify.Response, next: restify.Next) {
        const appId: number = parseInt(req.params.appId, 10);
        try {
            await authService.deleteApp(appId);
            res.send(204);
            return next();
        } catch (error) {
            OAuthController.errorResponse(error, res, next, `OAuthController { deleteApp: appId = ${appId} } error`);
        }
    }

    public static async login(req: restify.Request, res: restify.Response, next: restify.Next) {
        const loginRequest: IOAuthLoginRequest = req.body;
        try {
            const authResponse: IOAuthLoginResponse = await authService.OAuthLogin(loginRequest);
            res.json(authResponse);
            return next();
        } catch (error) {
            OAuthController.errorResponse(error, res, next, `OAuthService { createToken } error`);
        }
    }

    public static async getToken(req: restify.Request, res: restify.Response, next: restify.Next) {
        const getTokenRequest: IGetTokenRequest = req.body;
        try {
            const authResponse = await authService.OAuthGetToken(getTokenRequest);
            res.json(authResponse);
            return next();
        } catch (error) {
            OAuthController.errorResponse(error, res, next, `OAuthController { getToken } error`);
        }
    }

    public static async refreshToken(req: restify.Request, res: restify.Response, next: restify.Next) {
        const refreshRequest: IRefreshRequest = req.body;
        try {
            const tokenResponse: ITokenResponse = await authService.OAuthRefreshToken(refreshRequest);
            res.json(tokenResponse);
            return next();
        } catch (error) {
            OAuthController.errorResponse(error, res, next, `OAuthController { refreshToken } error`);
        }
    }

    public static async checkToken(req: restify.Request, res: restify.Response, next: restify.Next) {
        const tokenRequest: ITokenRequest = req.body;
        try {
            const userResponse: IUserAuthResponse = await authService.OAuthCheck(tokenRequest);
            res.send(userResponse);
            return next();
        } catch (error) {
            OAuthController.errorResponse(error, res, next, `OAuthController { checkToken } error`);
        }
    }

    public static async deleteToken(req: restify.Request, res: restify.Response, next: restify.Next) {
        const logoutRequest: ITokenRequest = req.body;
        try {
            const authResponse = await authService.OAuthDeleteToken(logoutRequest);
            res.json(204, authResponse);
            return next();
        } catch (error) {
            OAuthController.errorResponse(error, res, next, `OAuthController { deleteToken } error`);
        }
    }

}
