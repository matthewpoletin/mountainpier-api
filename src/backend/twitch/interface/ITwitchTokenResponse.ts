"use strict";

export default interface ITwitchTokenResponse {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    scope?: string[];
}
