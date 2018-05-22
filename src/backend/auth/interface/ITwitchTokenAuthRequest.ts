"use strict";

export default interface ITwitchTokenAuthRequest {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    scope: string;
    twitchId?: number;
}
