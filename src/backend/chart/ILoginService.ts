"use strict";

import ILoginRequest from "./interface/LoginRequest";
import ILoginResponse from "./interface/LoginResponse";
import {ILoginPaginated} from "./interface/LoginResponse";

export default interface ILoginService {

    getLogins(page?: number, size?: number): Promise<ILoginPaginated>;
    createLogin(loginRequest: ILoginRequest): Promise<ILoginResponse>;

    getLoginsOfUser(userId: string, page?: number, size?: number): Promise<ILoginPaginated>;
    getLatestLoginOfUser(userId: string): Promise<ILoginResponse>;

}
