"use strict";

export default interface IOAuthLoginRequest {
    appId: string;
    redirectUrl: string;
    username: string;
    password: string;
}
