"use strict";

import * as restify from "restify";

import AbstractController from "./AbstractController";

import ChannelService from "../backend/platform/ChannelService";

import IChannelRequest from "../backend/platform/interface/IChannelRequest";
import IChannelResponse from "../backend/platform/interface/IChannelResponse";
import IChannelPaginated from "../backend/platform/interface/IChannelResponse";

export default class ChannelController extends AbstractController {

    public static async getChannels(req: restify.Request, res: restify.Response, next: restify.Next) {
        const page: number = parseInt(req.query.page, 10) || 0;
        const size: number = parseInt(req.query.size, 10) || 25;
        const name: string = req.query.name;
        try {
            let channelResponses: IChannelPaginated = null;
            if (name) {
                channelResponses = await ChannelService.getChannels(page, size, name);
            } else {
                channelResponses = await ChannelService.getChannels(page, size);
            }
            res.json(channelResponses);
            return next();
        } catch (error) {
            ChannelController.errorResponse(error, res, next, `ChannelService { getChannels } error`);
        }
    }

    public static async createChannel(req: restify.Request, res: restify.Response, next: restify.Next) {
        const channelRequest: IChannelRequest = req.body;
        try {
            const channelResponse: IChannelResponse = await ChannelService.createChannel(channelRequest);
            res.json(201, channelResponse);
            return next();
        } catch (error) {
            ChannelController.errorResponse(error, res, next, `ChannelService { createChannel } error`);
        }
    }

    public static async getChannelById(req: restify.Request, res: restify.Response, next: restify.Next) {
        const channelId: number = parseInt(req.params.channelId, 10);
        try {
            const channelResponse: IChannelResponse = await ChannelService.getChannelById(channelId);
            res.json(channelResponse);
            return next();
        } catch (error) {
            ChannelController.errorResponse(error, res, next, `ChannelService { getChannel: channelId = ${channelId}} error`);
        }
    }

    public static async getChannelBy(req: restify.Request, res: restify.Response, next: restify.Next) {
        const channelname: string = req.query.channelname;
        const email: string = req.query.email;
        if (channelname) {
            try {
                const channelResponse = await ChannelService.getChannelBy({channelname});
                res.json(channelResponse);
                return next();
            } catch (error) {
                ChannelController.errorResponse(error, res, next, `ChannelService { getChannelBy: channelname = ${channelname}} error`);
            }
        } else {
            try {
                const channelResponse = await ChannelService.getChannelBy({email});
                res.json(channelResponse);
                return next();
            } catch (error) {
                ChannelController.errorResponse(error, res, next, `ChannelService { getChannelBy: email = ${email}} error`);
            }
        }
    }

    public static async updateChannelById(req: restify.Request, res: restify.Response, next: restify.Next) {
        const channelId: number = parseInt(req.params.channelId, 10);
        const channelRequest = req.body;
        try {
            const channelResponse: IChannelResponse = await ChannelService.updateChannelById(channelId, channelRequest);
            res.json(channelResponse);
            return next();
        } catch (error) {
            ChannelController.errorResponse(error, res, next, `ChannelService { updateChannel: channelId = ${channelId} } error`);
        }
    }

    public static async deleteChannelById(req: restify.Request, res: restify.Response, next: restify.Next) {
        const channelId = parseInt(req.params.channelId, 10);
        try {
            await ChannelService.deleteChannelById(channelId);
            res.send(204);
            return next();
        } catch (error) {
            ChannelController.errorResponse(error, res, next, `ChannelService { deleteChannel: channelId = ${channelId} } error`);
        }
    }

}
