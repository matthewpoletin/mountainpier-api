"use strict";

import IPaginated from "../../IPaginated";

export default interface IServerResponse {
    id: number;
    gameId: number;
    channelId: number;
    name?: string;
}

export interface IServerPaginated extends IPaginated {
    content: IServerResponse[];
}
