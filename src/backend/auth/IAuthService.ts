"use strict";

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

export default interface IAuthService {

    createUser(user: IUserAuthRequest): Promise<IUserAuthResponse>;

    getUserById(userId: string): Promise<IUserAuthResponse>;

    updateUserCredentials(userId: string, credentialsRequest): Promise<IUserAuthResponse>;

    deleteUser(userId: string): Promise<void>;

    getAppsOfUser(userId: string): Promise<IAppResponse[]>;

    login(credentials: ILoginRequest): Promise<ITokenResponse>;

    check(token: ITokenRequest): Promise<IUserAuthResponse>;

    refresh(refresh: IRefreshRequest): Promise<ITokenResponse>;

    logout(token: ITokenRequest): Promise<void>;

    createApp(appRequest: IAppRequest): Promise<IAppResponse>;

    getApp(appId: number): Promise<IAppResponse>;

    deleteApp(appId: number): Promise<void>;

    OAuthLogin(oauthLoginRequest: IOAuthLoginRequest): Promise<IOAuthLoginResponse>;

    OAuthGetToken(oauthGetTokenRequest: IGetTokenRequest): Promise<ITokenResponse>;

    OAuthRefreshToken(refresh: IRefreshRequest): Promise<ITokenResponse>;

    OAuthCheck(token: ITokenRequest): Promise<IUserAuthResponse>;

    OAuthDeleteToken(token: ITokenRequest): Promise<void>;

    createTwitchToken(userId: string, tokenRequest: ITwitchTokenAuthRequest): Promise<ITwitchTokenAuthResponse>;

    updateTwitchToken(userId: string, tokenRequest: ITwitchTokenAuthRequest): Promise<ITwitchTokenAuthResponse>;

}
