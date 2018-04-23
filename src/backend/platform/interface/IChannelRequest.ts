"use strict";

export default interface IServerRequest {
    email: string;
    password: string;
    oauthToken?: string;
}
