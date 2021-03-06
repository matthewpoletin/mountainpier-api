"use strict";

import IPaginated from "../../IPaginated";

export default interface IDeveloperResponse {
    id: number;
    userId?: string;
    name?: string;
    description?: string;
    website?: string;
    avatar?: string;
    user?: object;
}

export interface IDeveloperPaginated extends IPaginated {
    content: IDeveloperResponse[];
}
