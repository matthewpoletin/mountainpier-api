"use strict";

import IProviderTokenRequest from "./interface/ProviderTokenRequest";
import IProviderTokenResponse from "./interface/ProviderTokenResponse";

export default interface IProviderService {

    createToken(userId: string, tokenRequest: IProviderTokenRequest): Promise<IProviderTokenResponse>;

    getToken(userId: string): Promise<IProviderTokenResponse>;

    deleteToken(userId: string): Promise<void>;

}
