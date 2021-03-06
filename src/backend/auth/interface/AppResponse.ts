"use strict";

import IPaginated from "../../IPaginated";

export default interface IAppResponse {
    id: number;
    secret: string;
    name: string;
    redirectUri: string;
    userId: string;
}

export interface IAppPaginated extends IPaginated {
    content: IAppResponse[];
}
