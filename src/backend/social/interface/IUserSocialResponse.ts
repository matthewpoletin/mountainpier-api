"use strict";

import IPaginated from "../../IPaginated";

export default interface IUserSocialResponse {
    id: string;
    username?: string;
    avatar?: string;
    regEmail?: string;
    regDate?: number;
    birthDate?: number;
    status?: string;
}

export interface IUserSocialPaginated extends IPaginated {
    content: IUserSocialResponse[];
}
