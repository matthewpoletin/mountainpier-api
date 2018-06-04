"use strict";

import * as restify from "restify";

import AbstractController from "./AbstractController";

import LoginService from "../backend/chart/LoginService";

import ILoginResponse, {ILoginPaginated} from "../backend/chart/interface/LoginResponse";

export default class LoginController extends AbstractController {

    public static async getLogins(req: restify.Request, res: restify.Response, next: restify.Next) {
        const page: number = parseInt(req.query.page, 10) || 0;
        const size: number = parseInt(req.query.size, 10) || 25;
        try {
            const loginsResponse: ILoginPaginated = await LoginService.getLogins(page, size);
            res.json(loginsResponse);
            return next();
        } catch (error) {
            LoginController.errorResponse(error, res, next, `LoginService { getLogins } error`);
        }
    }

    public static async createLogin(req: restify.Request, res: restify.Response, next: restify.Next) {
        const loginRequest = req.body;
        try {
            const loginResponse: ILoginResponse = await LoginService.createLogin(loginRequest);
            res.json(loginResponse);
            return next();
        } catch (error) {
            LoginController.errorResponse(error, res, next, `LoginService { createLogin } error`);
        }
    }

}
