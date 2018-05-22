"use strict";

import IPaginated from "../../IPaginated";

export default interface IUserSocialResponse {
    id: string;
    username?: string;
    avatar?: string;
    regEmail?: string;
    regDate?: string;
    birthDate?: string;
    status?: string;
}

export interface IUserPaginated extends IPaginated {
    content: IUserSocialResponse[];
}
