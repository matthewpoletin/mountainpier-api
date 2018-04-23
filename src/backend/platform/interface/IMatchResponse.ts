"use strict";

import IPaginated from "../../IPaginated";

export default interface IMatchResponse {
    id: number;
    serverId: number;
    userId: string;
}

export interface IMatchPaginated extends IPaginated {
    content: IMatchResponse[];
}
