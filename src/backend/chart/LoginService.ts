"use strict";

import config from "../../../IConfig";
import getOptions from "../../Options";
import requestWrapper from "../authrequest";
import ILoginService from "./ILoginService";
import ILoginRequest from "./interface/LoginRequest";
import ILoginResponse, {ILoginPaginated} from "./interface/LoginResponse";

const rp = requestWrapper({id: 3, secret: "qULETS2mSjRKMgNppMSutTPb4xb1IzqxmbNoWv9HHYoIFMuZUZ"});

const mode = process.env.NODE_ENV || "development";
const chartServiceURL = config[mode].services.chart;

class LoginService implements ILoginService {

    public async getLogins(page?: number, size?: number): Promise<ILoginPaginated> {
        const options = getOptions(chartServiceURL, `/logins`, {page, size}, null);
        return rp.get(options);
    }

    public async createLogin(loginRequest: ILoginRequest): Promise<ILoginResponse> {
        const options = getOptions(chartServiceURL, `/logins`, null, loginRequest);
        return rp.post(options);
    }

    public async getLoginsOfUser(userId: string, page?: number, size?: number): Promise<ILoginPaginated> {
        const options = getOptions(chartServiceURL, `/users/${userId}/logins`, {page, size}, null);
        return rp.get(options);
    }

    public async getLatestLoginOfUser(userId: string): Promise<ILoginResponse> {
        const options = getOptions(chartServiceURL, `/users/${userId}/logins/latest`, null, null);
        return rp.get(options);
    }

}

export default new LoginService();
