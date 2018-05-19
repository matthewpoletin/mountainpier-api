"use strict";

export default interface IProviderTokenRequest {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    scope: string;
}
