"use strict";

import IUserRequest from "./interface/IUserRequest";
import IUserResponse from "./interface/IUserResponse";
import IUserPaginated from "./interface/IUserResponse";

import IUserService from "./IUserService";

import getOptions from "../../Options";

import config from "../../../IConfig";

import requestWrapper from "../authrequest";
const rp = requestWrapper({id: 3, secret: "qULETS2mSjRKMgNppMSutTPb4xb1IzqxmbNoWv9HHYoIFMuZUZ"});

const socialServiceURL = config.Services.Social.url + config.Services.Social.port + config.Services.Social.base;

class UserService implements IUserService {

    public async getUsers(page?: number, size?: number, username?): Promise<IUserPaginated> {
        const options = getOptions(socialServiceURL, `/users`, {page, size, username});
        return rp.get(options);
    }

    public async createUser(userRequest: IUserRequest): Promise<{ id: number; }> {
        const options = getOptions(socialServiceURL, `/users`, null, userRequest);
        return rp.post(options);
    }

    public async getUserById(userId: string): Promise<IUserResponse> {
        const options = getOptions(socialServiceURL, `/users/${userId}`);
        return rp.get(options);
    }

    public async getUserBy(params): Promise<IUserResponse> {
        const options = getOptions(socialServiceURL, `/users/by`, params);
        return rp.get(options);
    }

    public async updateUserById(userId: string, userRequest: IUserRequest): Promise<IUserResponse> {
        const options = getOptions(socialServiceURL, `/users/${userId}`, null, userRequest);
        return rp.patch(options);
    }

    public async deleteUserById(userId: string): Promise<void> {
        const options = getOptions(socialServiceURL, `/users/${userId}`);
        return rp.delete(options);
    }

    public async getFriends(userId: string, page?: number, size?: number): Promise<IUserResponse[]> {
        const options = getOptions(socialServiceURL, `/users/${userId}/friends`, {page, size});
        return rp.get(options);
    }

    public async getGames(userId: string, page: number, size: number): Promise<[string]> {
        const options = getOptions(socialServiceURL, `/users/${userId}/games`, {page, size});
        return rp.get(options);
    }

}

export default new UserService();
