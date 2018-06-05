"use strict";

import config from "../../../IConfig";
import getOptions from "../../Options";
import requestWrapper from "../authrequest";
import IChannelResponse from "./interface/IChannelResponse";
import IMatchRequest from "./interface/IMatchRequest";
import IMatchResponse from "./interface/IMatchResponse";
import IServerRequest from "./interface/IServerRequest";
import IServerResponse, {IServerPaginated} from "./interface/IServerResponse";
import IServerService from "./IServerService";

const rp = requestWrapper({id: 3, secret: "qULETS2mSjRKMgNppMSutTPb4xb1IzqxmbNoWv9HHYoIFMuZUZ"});

const mode = process.env.NODE_ENV || "development";
const platformServiceURL = config[mode].services.platform;

class ServerService implements IServerService {

    public async getServers(page?: number, size?: number, servername?): Promise<IServerPaginated> {
        const options = getOptions(platformServiceURL, `/servers`, {page, size, servername});
        return rp.get(options);
    }

    public async createServer(serverRequest: IServerRequest): Promise<IServerResponse> {
        const options = getOptions(platformServiceURL, `/servers`, null, serverRequest);
        return rp.post(options);
    }

    public async getServerById(serverId: number): Promise<IServerResponse> {
        const options = getOptions(platformServiceURL, `/servers/${serverId}`);
        return rp.get(options);
    }

    public async getServerBy(params): Promise<IServerResponse> {
        const options = getOptions(platformServiceURL, `/servers/by`, params);
        return rp.get(options);
    }

    public async updateServerById(serverId: number, serverRequest: IServerRequest): Promise<IServerResponse> {
        const options = getOptions(platformServiceURL, `/servers/${serverId}`, null, serverRequest);
        return rp.patch(options);
    }

    public async deleteServerById(serverId: number): Promise<void> {
        const options = getOptions(platformServiceURL, `/servers/${serverId}`);
        return rp.delete(options);
    }

    public async getChannelOfServerById(serverId: number): Promise<IChannelResponse> {
        const options = getOptions(platformServiceURL, `/servers/${serverId}/channel`);
        return rp.get(options);
    }

    public async getUsersOfServerById(serverId: number, page: number, size: number): Promise<any> {
        const options = getOptions(platformServiceURL, `/servers/${serverId}/users`);
        return rp.get(options);
    }

    public async addUserToServer(serverId: number, userId: string, matchRequest: IMatchRequest): Promise<IMatchResponse> {
        const options = getOptions(platformServiceURL, `/servers/${serverId}/users/${userId}`, null, matchRequest);
        return rp.post(options);
    }

    public async removeUserFromServer(serverId: number, userId: string): Promise<void> {
        const options = getOptions(platformServiceURL, `/servers/${serverId}/users/${userId}`);
        return rp.delete(options);
    }

}

export default new ServerService();
