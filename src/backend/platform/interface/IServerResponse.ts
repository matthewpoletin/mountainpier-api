"use strict";

import IPaginated from "../../IPaginated";

export default interface IServerResponse {
    id: number;
    gameId: string;
    channelId: number;
    name?: string;
    game?: object;
}

export interface IServerPaginated extends IPaginated {
    content: IServerResponse[];
}
