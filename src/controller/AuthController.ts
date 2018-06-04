"use strict";

import * as restify from "restify";

import AbstractController from "./AbstractController";

import AuthService from "../backend/auth/AuthService";
import UserService from "../backend/social/UserService";

import ILoginAuthRequest from "../backend/auth/interface/LoginAuthRequest";
import IRefreshRequest from "../backend/auth/interface/RefreshRequest";
import ITokenRequest from "../backend/auth/interface/TokenRequest";
import IUserAuthResponse from "../backend/auth/interface/UserAuthResponse";
import IUserSocialResponse from "../backend/social/interface/IUserSocialResponse";

export default class AuthController extends AbstractController {

    public static async login(req: restify.Request, res: restify.Response, next: restify.Next) {
        const loginRequest: ILoginAuthRequest = req.body;
        try {
            const authResponse = await AuthService.login(loginRequest);
            return res.json(201, authResponse);
        } catch (error) {
            AuthController.errorResponse(error, res, next, `AuthService { login } error`);
        }
    }

    public static async check(req: restify.Request, res: restify.Response, next: restify.Next) {
        const checkRequest: ITokenRequest = req.body;
        try {
            const userAuthResponse: IUserAuthResponse = await AuthService.check(checkRequest);
            const userSocialResponse: IUserSocialResponse = await UserService.getUserById(userAuthResponse.id);
            const userResponse = {...userSocialResponse, ...userAuthResponse};
            return res.json(200, userResponse);
        } catch (error) {
            AuthController.errorResponse(error, res, next, `AuthService { check } error`);
        }
    }

    public static async refresh(req: restify.Request, res: restify.Response, next: restify.Next) {
        const refreshRequest: IRefreshRequest = req.body;
        try {
            const authResponse = await AuthService.refresh(refreshRequest);
            return res.json(201, authResponse);
        } catch (error) {
            AuthController.errorResponse(error, res, next, `AuthService { refresh } error`);
        }
    }

    public static async logout(req: restify.Request, res: restify.Response, next: restify.Next) {
        const logoutRequest: ITokenRequest = req.body;
        try {
            const authResponse = await AuthService.logout(logoutRequest);
            return res.json(204, authResponse);
        } catch (error) {
            AuthController.errorResponse(error, res, next, `AuthService { logout } error`);
        }
    }

}
