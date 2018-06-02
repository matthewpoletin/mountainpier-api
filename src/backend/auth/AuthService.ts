"use strict";

import config from "../../../IConfig";
import getOptions from "../../Options";
import requestWrapper from "../authrequest";
import IAuthService from "./IAuthService";
import IAppRequest from "./interface/AppRequest";
import IAppResponse from "./interface/AppResponse";
import IGetTokenRequest from "./interface/GetTokenRequest";
import ITwitchTokenAuthRequest from "./interface/ITwitchTokenAuthRequest";
import ITwitchTokenAuthResponse from "./interface/ITwitchTokenAuthResponse";
import ILoginRequest from "./interface/LoginRequest";
import IOAuthLoginRequest from "./interface/OAuthLoginRequest";
import IOAuthLoginResponse from "./interface/OAuthLoginResponse";
import IRefreshRequest from "./interface/RefreshRequest";
import ITokenRequest from "./interface/TokenRequest";
import ITokenResponse from "./interface/TokenResponse";
import IUserAuthRequest from "./interface/UserAuthRequest";
import IUserAuthResponse from "./interface/UserAuthResponse";

const rp = requestWrapper({id: 3, secret: "qULETS2mSjRKMgNppMSutTPb4xb1IzqxmbNoWv9HHYoIFMuZUZ"});

const mode = process.env.NODE_ENV || "development";
const authServiceURL = config[mode].services.auth;

class AuthService implements IAuthService {

    public createUser(user: IUserAuthRequest): Promise<IUserAuthResponse> {
        const options = getOptions(authServiceURL, `/users`, null, user);
        return rp.post(options);
    }

    public getUserById(userId: string): Promise<IUserAuthResponse> {
        const options = getOptions(authServiceURL, `/users/${userId}`, null, null);
        return rp.get(options);
    }

    public async updateUserCredentials(userId: string, credentialsRequest): Promise<IUserAuthResponse> {
        const options = getOptions(authServiceURL, `/users/${userId}/credentials`, null, credentialsRequest);
        return rp.patch(options);
    }

    public deleteUser(userId: string): Promise<void> {
        const options = getOptions(authServiceURL, `/users/${userId}`, null, null);
        return rp.delete(options);
    }

    public getAppsOfUser(userId: string): Promise<IAppResponse[]> {
        const options = getOptions(authServiceURL, `/users/${userId}/apps`, null, null);
        return rp.get(options);
    }

    public login(credentials: ILoginRequest): Promise<ITokenResponse> {
        const options = getOptions(authServiceURL, `/token`, null, credentials);
        return rp.post(options);
    }

    public check(token: ITokenRequest): Promise<IUserAuthResponse> {
        const options = getOptions(authServiceURL, `/token/check`, null, token);
        return rp.post(options);
    }

    public refresh(refresh: IRefreshRequest): Promise<ITokenResponse> {
        const options = getOptions(authServiceURL, `/token`, null, refresh);
        return rp.post(options);
    }

    public logout(token: ITokenRequest): Promise<void> {
        const options = getOptions(authServiceURL, `/token`, null, token);
        return rp.delete(options);
    }

    public async getApps(page: number, size: number) {
        const options = getOptions(authServiceURL, `/apps`, {page, size}, null);
        return rp.get(options);
    }

    public createApp(appRequest: IAppRequest): Promise<IAppResponse> {
        const options = getOptions(authServiceURL, `/apps`, null, appRequest);
        return rp.post(options);
    }

    public getApp(appId: number): Promise<IAppResponse> {
        const options = getOptions(authServiceURL, `/apps/${appId}`, null, null);
        return rp.get(options);
    }

    public deleteApp(appId: number): Promise<void> {
        const options = getOptions(authServiceURL, `/apps/${appId}`, null, null);
        return rp.delete(options);
    }

    public OAuthLogin(oauthLoginRequest: IOAuthLoginRequest): Promise<IOAuthLoginResponse> {
        const options = getOptions(authServiceURL, `/oauth/login`, null, oauthLoginRequest);
        return rp.post(options);
    }

    public OAuthGetToken(oauthGetTokenRequest: IGetTokenRequest): Promise<ITokenResponse> {
        const options = getOptions(authServiceURL, `/oauth/token/`, null, oauthGetTokenRequest);
        return rp.post(options);
    }

    public OAuthRefreshToken(refresh: IRefreshRequest): Promise<ITokenResponse> {
        const options = getOptions(authServiceURL, `/oauth/token/refresh`, null, refresh);
        return rp.post(options);
    }

    public OAuthCheck(token: ITokenRequest): Promise<IUserAuthResponse> {
        const options = getOptions(authServiceURL, `/oauth/token/check`, null, token);
        return rp.post(options);
    }

    public OAuthDeleteToken(token: ITokenRequest): Promise<void> {
        const options = getOptions(authServiceURL, `/oauth/token`, null, token);
        return rp.delete(options);
    }

    public async createTwitchToken(userId: string, tokenRequest: ITwitchTokenAuthRequest): Promise<ITwitchTokenAuthResponse> {
        const options = getOptions(authServiceURL, `/providers/twitch/users/${userId}`, null, tokenRequest);
        return rp.post(options);
    }

    public async updateTwitchToken(userId: string, tokenRequest: ITwitchTokenAuthRequest): Promise<ITwitchTokenAuthResponse> {
        const options = getOptions(authServiceURL, `/providers/twitch/users/${userId}`, null, tokenRequest);
        return rp.patch(options);
    }

}

export default new AuthService();
