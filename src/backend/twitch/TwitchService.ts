"use strict";

import * as rp from "request-promise";
import config from "../../../IConfig";
import getOptions from "../../Options";
import ITwitchTokenResponse from "./interface/ITwitchTokenResponse";
import ITwitchService from "./ITwitchService";

const mode = process.env.NODE_ENV || "development";
const clientId = config[mode].twitch.clientId;
const clientSecret = config[mode].twitch.clientSecret;
class TwitchService implements ITwitchService {

    public async getAccessToken(code: string): Promise<ITwitchTokenResponse> {
        const params = {
            client_id: clientId,
            client_secret: clientSecret,
            code,
            grant_type: "authorization_code",
        };
        const options = getOptions("https://id.twitch.tv/", `/oauth2/token`, params, null);
        return rp.post(options);
    }

    public async getUserByAccessToken(accessToken): Promise<ITwitchTokenResponse> {
        const headers = {
            "Authorization": `OAuth ${accessToken}`,
            "Client-ID": clientId,
        };
        const options = getOptions("https://api.twitch.tv/", `/kraken/user`, null, null, headers);
        return rp.post(options);
    }

}

export default new TwitchService();
