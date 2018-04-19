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
import IUserResponse from "./interface/UserResponse";

export default interface IAuthService {

    login(credentials: ILoginRequest): Promise<ITokenResponse>;

    check(token: ITokenRequest): Promise<IUserResponse>;

    refresh(refresh: IRefreshRequest): Promise<ITokenResponse>;

    logout(token: ITokenRequest): Promise<void>;

    createApp(appRequest: IAppRequest): Promise<IAppResponse>;

    getApp(appId: number): Promise<IAppResponse>;

    OAuthLogin(oauthLoginRequest: IOAuthLoginRequest): Promise<IOAuthLoginResponse>;

    OAuthGetToken(oauthGetTokenRequest: IGetTokenRequest): Promise<ITokenResponse>;

    OAuthRefreshToken(refresh: IRefreshRequest): Promise<ITokenResponse>;

    OAuthCheck(token: ITokenRequest): Promise<IUserResponse>;

    OAuthDeleteToken(token: ITokenRequest): Promise<void>;


}
