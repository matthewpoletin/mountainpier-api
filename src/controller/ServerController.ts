"use strict";

import * as restify from "restify";

import AbstractController from "./AbstractController";

import ServerService from "../backend/platform/ServerService";
import UserService from "../backend/social/UserService";

import IChannelResponse from "../backend/platform/interface/IChannelResponse";
import IMatchRequest from "../backend/platform/interface/IMatchRequest";
import IServerRequest from "../backend/platform/interface/IServerRequest";
import IServerResponse from "../backend/platform/interface/IServerResponse";
import IServerPaginated from "../backend/platform/interface/IServerResponse";
import {IUserPaginated} from "../backend/social/interface/IUserResponse";

export default class ServerController extends AbstractController {

    public static async getServers(req: restify.Request, res: restify.Response, next: restify.Next) {
        const page: number = parseInt(req.query.page, 10) || 0;
        const size: number = parseInt(req.query.size, 10) || 25;
        const name: string = req.query.name;
        try {
            let serverResponses: IServerPaginated = null;
            if (name) {
                serverResponses = await ServerService.getServers(page, size, name);
            } else {
                serverResponses = await ServerService.getServers(page, size);
            }
            res.json(serverResponses);
            return next();
        } catch (error) {
            ServerController.errorResponse(error, res, next, `ServerService { getServers } error`);
        }
    }

    public static async createServer(req: restify.Request, res: restify.Response, next: restify.Next) {
        const serverRequest: IServerRequest = req.body;
        try {
            const serverResponse: IServerResponse = await ServerService.createServer(serverRequest);
            res.json(201, serverResponse);
            return next();
        } catch (error) {
            ServerController.errorResponse(error, res, next, `ServerService { createServer } error`);
        }
    }

    public static async getServerById(req: restify.Request, res: restify.Response, next: restify.Next) {
        const serverId: number = parseInt(req.params.serverId, 10);
        try {
            const serverResponse: IServerResponse = await ServerService.getServerById(serverId);
            res.json(serverResponse);
            return next();
        } catch (error) {
            ServerController.errorResponse(error, res, next, `ServerService { getServer: serverId = ${serverId}} error`);
        }
    }

    public static async getServerBy(req: restify.Request, res: restify.Response, next: restify.Next) {
        const servername: string = req.query.servername;
        const email: string = req.query.email;
        if (servername) {
            try {
                const serverResponse = await ServerService.getServerBy({servername});
                res.json(serverResponse);
                return next();
            } catch (error) {
                ServerController.errorResponse(error, res, next, `ServerService { getServerBy: servername = ${servername}} error`);
            }
        } else {
            try {
                const serverResponse = await ServerService.getServerBy({email});
                res.json(serverResponse);
                return next();
            } catch (error) {
                ServerController.errorResponse(error, res, next, `ServerService { getServerBy: email = ${email}} error`);
            }
        }
    }

    public static async updateServerById(req: restify.Request, res: restify.Response, next: restify.Next) {
        const serverId: number = parseInt(req.params.serverId, 10);
        const serverRequest = req.body;
        try {
            const serverResponse: IServerResponse = await ServerService.updateServerById(serverId, serverRequest);
            res.json(serverResponse);
            return next();
        } catch (error) {
            ServerController.errorResponse(error, res, next, `ServerService { updateServer: serverId = ${serverId} } error`);
        }
    }

    public static async deleteServerById(req: restify.Request, res: restify.Response, next: restify.Next) {
        const serverId = parseInt(req.params.serverId, 10);
        try {
            await ServerService.deleteServerById(serverId);
            res.send(204);
            return next();
        } catch (error) {
            ServerController.errorResponse(error, res, next, `ServerService { deleteServer: serverId = ${serverId} } error`);
        }
    }

    public static async getChannelOfServiceById(req: restify.Request, res: restify.Response, next: restify.Next) {
        const serverId: number = parseInt(req.params.serverId, 10);
        try {
            const channelResponse: IChannelResponse = await ServerService.getChannelOfServerById(serverId);
            res.json(channelResponse);
            return next();
        } catch (error) {
            ServerController.errorResponse(error, res, next, `ServerService { getChannelOfService: serverId = ${serverId} } error`);
        }
    }

    public static async getUsersOfServerById(req: restify.Request, res: restify.Response, next: restify.Next) {
        const serverId: number = parseInt(req.params.serverId, 10);
        const page: number = parseInt(req.query.page, 10) || 0;
        const size: number = parseInt(req.query.size, 10) || 25;
        try {
            const usersIdResponse = await ServerService.getUsersOfServerById(serverId, page, size);
            const userResponsePromises = [];
            usersIdResponse.content.forEach((userId) => {
                userResponsePromises.push(UserService.getUserById(userId));
            });
            const usersResponse: IUserPaginated = usersIdResponse;
            usersResponse.content = await Promise.all(userResponsePromises);
            res.json(usersResponse);
            return next();
        } catch (error) {
            ServerController.errorResponse(error, res, next, `ServerService { getUsersOfServer: serverId = ${serverId} } error`);
        }
    }

    public static async addUsersToServerById(req: restify.Request, res: restify.Response, next: restify.Next) {
        const userId: string = req.params.userId;
        const serverId: number = parseInt(req.params.serverId, 10);
        const matchRequest: IMatchRequest = req.body;
        try {
            await UserService.getUserById(userId);
            const matchResponse = await ServerService.addUserToServer(serverId, userId, matchRequest);
            res.json(201, matchResponse);
            return next();
        } catch (error) {
            ServerController.errorResponse(error, res, next, `ServerService { getUsersOfServer: serverId = ${serverId} } error`);
        }
    }

    public static async removeUsersFromServerById(req: restify.Request, res: restify.Response, next: restify.Next) {
        const userId: string = req.params.userId;
        const serverId: number = parseInt(req.params.serverId, 10);
        try {
            await UserService.getUserById(userId);
            await ServerService.removeUserFromServer(serverId, userId);
            res.send(204);
            return next();
        } catch (error) {
            ServerController.errorResponse(error, res, next, `ServerService { getUsersOfServer: serverId = ${serverId} } error`);
        }
    }

}
