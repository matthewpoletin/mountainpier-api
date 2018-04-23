"use strict";

import IPaginated from "../../IPaginated";

export default interface IChannelResponse {
    id: number;
    email: string;
    password: string;
    oauthToken?: string;
}

export interface IChannelPaginated extends IPaginated {
    content: IChannelResponse[];
}
