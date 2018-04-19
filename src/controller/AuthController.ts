"use strict";

import * as restify from "restify";

import AbstractController from "./AbstractController";

import authService from "../backend/auth/AuthService";

import ILoginRequest from "../backend/auth/interface/LoginRequest";
import IRefreshRequest from "../backend/auth/interface/RefreshRequest";
import ITokenRequest from "../backend/auth/interface/TokenRequest";

export default class AuthController extends AbstractController {

    public static async login(req: restify.Request, res: restify.Response, next: restify.Next) {
        const loginRequest: ILoginRequest = req.body;
        try {
            const authResponse = await authService.login(loginRequest);
            return res.json(201, authResponse);
        } catch (error) {
            AuthController.errorResponse(error, res, next, `AuthService { login } error`);
        }
    }

    public static async check(req: restify.Request, res: restify.Response, next: restify.Next) {
        const checkRequest: ITokenRequest = req.body;
        try {
            const authResponse = await authService.check(checkRequest);
            return res.json(201, authResponse);
        } catch (error) {
            AuthController.errorResponse(error, res, next, `AuthService { check } error`);
        }
    }

    public static async refresh(req: restify.Request, res: restify.Response, next: restify.Next) {
        const refreshRequest: IRefreshRequest = req.body;
        try {
            const authResponse = await authService.refresh(refreshRequest);
            return res.json(201, authResponse);
        } catch (error) {
            AuthController.errorResponse(error, res, next, `AuthService { refresh } error`);
        }
    }

    public static async logout(req: restify.Request, res: restify.Response, next: restify.Next) {
        const logoutRequest: ITokenRequest = req.body;
        try {
            const authResponse = await authService.logout(logoutRequest);
            return res.json(204, authResponse);
        } catch (error) {
            AuthController.errorResponse(error, res, next, `AuthService { logout } error`);
        }
    }

}
