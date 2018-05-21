"use strict";

import ITwitchTokenResponse from "./interface/ITwitchTokenResponse";

export default interface ITwitchService {
    getAccessToken(code: string): Promise<ITwitchTokenResponse>;
}
