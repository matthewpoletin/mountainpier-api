"use strict";

import ITwitchTokenResponse from "./interface/ITwitchTokenResponse";
import ITwitchUserResponse from "./interface/ITwitchUserResponse";

export default interface ITwitchService {
    getAccessToken(code: string): Promise<ITwitchTokenResponse>;
    getUserByAccessToken(accessToken): Promise<ITwitchUserResponse>;
}
