"use strict";

import IChannelResponse from "./interface/IChannelResponse";
import IMatchRequest from "./interface/IMatchRequest";
import IMatchResponse from "./interface/IMatchResponse";
import IServerRequest from "./interface/IServerRequest";
import IServerResponse, {IServerPaginated} from "./interface/IServerResponse";

export default interface IServerService {
    getServers(page?: number, size?: number, query?: string): Promise<IServerPaginated>;
    createServer(serverRequest: IServerRequest): Promise<IServerResponse>;
    getServerById(serverId: number): Promise<IServerResponse>;
    getServerBy(params): Promise<IServerResponse>;
    updateServerById(serverId: number, serverRequest: IServerRequest): Promise<IServerResponse>;
    deleteServerById(serverId: number): Promise<void>;

    getChannelOfServerById(serverId: number, page: number, size: number): Promise<IChannelResponse>;

    getUsersOfServerById(serverId: number, page: number, size: number): Promise<any>;
    addUserToServer(serverId: number, userId: string, matchRequest: IMatchRequest): Promise<IMatchResponse>;
    removeUserFromServer(serverId: number, userId: string): Promise<void>;
}
