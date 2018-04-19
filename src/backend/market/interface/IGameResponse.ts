"use strict";

import IPaginated from "../../IPaginated";

export default interface IGameResponse {
    id: number;
    name?: string;
    avatar?: string;
    description?: string;
    developerId?: string;
    price?: string;
}

export interface IGamePaginated extends IPaginated {
    content: IGameResponse[];
}
