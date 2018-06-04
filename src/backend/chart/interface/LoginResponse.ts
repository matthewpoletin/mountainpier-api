"use strict";

import IPaginated from "../../IPaginated";

export default interface ILoginResponse {
    id: number;
    userId: string;
    date: number;
}

export interface ILoginPaginated extends IPaginated {
    content: ILoginResponse[];
}
