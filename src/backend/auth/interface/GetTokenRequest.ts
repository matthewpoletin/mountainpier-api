"use strict";

export default interface IGetTokenRequest {
    appId: number;
    appSecret: string;
    code: string;
}
