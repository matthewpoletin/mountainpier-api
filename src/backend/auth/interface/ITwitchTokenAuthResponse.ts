"use strict";

export default interface ITwitchTokenAuthResponse {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    scope: string;
    userId: string;
    twitchId?: number;
}
