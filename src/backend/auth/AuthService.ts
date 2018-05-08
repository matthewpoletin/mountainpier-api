"use strict";

import IAppRequest from "./interface/AppRequest";
import IAppResponse from "./interface/AppResponse";
import IGetTokenRequest from "./interface/GetTokenRequest";
import ILoginRequest from "./interface/LoginRequest";
import IOAuthLoginRequest from "./interface/OAuthLoginRequest";
import IOAuthLoginResponse from "./interface/OAuthLoginResponse";
import IRefreshRequest from "./interface/RefreshRequest";
import ITokenRequest from "./interface/TokenRequest";
import ITokenResponse from "./interface/TokenResponse";
import IUserAuthRequest from "./interface/UserAuthRequest";
import IUserAuthResponse from "./interface/UserAuthResponse";

import IAuthService from "./IAuthService";

import getOptions from "../../Options";

import config from "../../../IConfig";

import requestWrapper from "../authrequest";
const rp = requestWrapper({id: 3, secret: "qULETS2mSjRKMgNppMSutTPb4xb1IzqxmbNoWv9HHYoIFMuZUZ"});

const authServiceURL = config.Services.Auth.url + config.Services.Auth.port + config.Services.Auth.base;

class AuthService implements IAuthService {

    public createUser(user: IUserAuthRequest): Promise<IUserAuthResponse> {
        const options = getOptions(authServiceURL, "/user", null, user);
        return rp.post(options);
    }

    public deleteUser(userId: string): Promise<void> {
        const options = getOptions(authServiceURL, `/user/${userId}`, null, null);
        return rp.delete(options);
    }

    public getAppsOfUser(userId: string): Promise<IAppResponse[]> {
        const options = getOptions(authServiceURL, `/user/${userId}/apps`, null, null);
        return rp.get(options);
    }

    public login(credentials: ILoginRequest): Promise<ITokenResponse> {
        const options = getOptions(authServiceURL, "/token", null, credentials);
        return rp.post(options);
    }

    public check(token: ITokenRequest): Promise<IUserAuthResponse> {
        const options = getOptions(authServiceURL, "/token/check", null, token);
        return rp.post(options);
    }

    public refresh(refresh: IRefreshRequest): Promise<ITokenResponse> {
        const options = getOptions(authServiceURL, "/token", null, refresh);
        return rp.post(options);
    }

    public logout(token: ITokenRequest): Promise<void> {
        const options = getOptions(authServiceURL, "/token", null, token);
        return rp.delete(options);
    }

    public createApp(appRequest: IAppRequest): Promise<IAppResponse> {
        const options = getOptions(authServiceURL, `/app`, null, appRequest);
        return rp.post(options);
    }

    public getApp(appId: number): Promise<IAppResponse> {
        const options = getOptions(authServiceURL, `/app/${appId}`, null, null);
        return rp.get(options);
    }

    public deleteApp(appId: number): Promise<void> {
        const options = getOptions(authServiceURL, `/app/${appId}`, null, null);
        return rp.delete(options);
    }

    public OAuthLogin(oauthLoginRequest: IOAuthLoginRequest): Promise<IOAuthLoginResponse> {
        const options = getOptions(authServiceURL, "/oauth/login", null, oauthLoginRequest);
        return rp.post(options);
    }

    public OAuthGetToken(oauthGetTokenRequest: IGetTokenRequest): Promise<ITokenResponse> {
        const options = getOptions(authServiceURL, "/oauth/token/", null, oauthGetTokenRequest);
        return rp.post(options);
    }

    public OAuthRefreshToken(refresh: IRefreshRequest): Promise<ITokenResponse> {
        const options = getOptions(authServiceURL, "/oauth/token/refresh", null, refresh);
        return rp.post(options);
    }

    public OAuthCheck(token: ITokenRequest): Promise<IUserAuthResponse> {
        const options = getOptions(authServiceURL, "/oauth/token/check", null, token);
        return rp.post(options);
    }

    public OAuthDeleteToken(token: ITokenRequest): Promise<void> {
        const options = getOptions(authServiceURL, "/oauth/token", null, token);
        return rp.delete(options);
    }
}

export default new AuthService();
