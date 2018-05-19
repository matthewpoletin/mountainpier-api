"use strict";

export default interface IProviderTokenResponse {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    scope: string;
    userId: string;
}
