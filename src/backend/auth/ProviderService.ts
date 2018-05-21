"use strict";

import config from "../../../IConfig";
import getOptions from "../../Options";
import requestWrapper from "../authrequest";
import IProviderTokenRequest from "./interface/ProviderTokenRequest";
import IProviderTokenResponse from "./interface/ProviderTokenResponse";
import IProviderService from "./IProviderService";

const rp = requestWrapper({id: 3, secret: "qULETS2mSjRKMgNppMSutTPb4xb1IzqxmbNoWv9HHYoIFMuZUZ"});

const mode = process.env.NODE_ENV || "development";
const authServiceURL = config[mode].services.auth;

class ProviderService implements IProviderService {

    public createToken(userId: string, tokenRequest: IProviderTokenRequest): Promise<IProviderTokenResponse> {
        const options = getOptions(authServiceURL, `/providers/twitch/users/${userId}`, null, tokenRequest);
        return rp.post(options);
    }

    public getToken(userId: string): Promise<IProviderTokenResponse> {
        const options = getOptions(authServiceURL, `/providers/twitch/users/${userId}`, null, null);
        return rp.get(options);
    }

    public deleteToken(userId: string): Promise<void> {
        const options = getOptions(authServiceURL, `/providers/twitch/users/${userId}`, null, null);
        return rp.delete(options);
    }

}

export default new ProviderService();
