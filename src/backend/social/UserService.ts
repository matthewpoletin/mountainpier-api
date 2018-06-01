"use strict";

import config from "../../../IConfig";
import getOptions from "../../Options";
import requestWrapper from "../authrequest";
import IServerResponse from "../platform/interface/IServerResponse";
import IUserSocialRequest from "./interface/IUserSocialRequest";
import IUserSocialResponse from "./interface/IUserSocialResponse";
import IUserPaginated from "./interface/IUserSocialResponse";
import IUserService from "./IUserService";

const rp = requestWrapper({id: 3, secret: "qULETS2mSjRKMgNppMSutTPb4xb1IzqxmbNoWv9HHYoIFMuZUZ"});

const mode = process.env.NODE_ENV || "development";
const socialServiceURL = config[mode].services.social;
const platformServiceURL = config[mode].services.platform;

class UserService implements IUserService {

    public async getUsers(page?: number, size?: number, username?): Promise<IUserPaginated> {
        const options = getOptions(socialServiceURL, `/users`, {page, size, username});
        return rp.get(options);
    }

    public async createUser(userRequest: IUserSocialRequest): Promise<IUserSocialResponse> {
        const options = getOptions(socialServiceURL, `/users`, null, userRequest);
        return rp.post(options);
    }

    public async getUserById(userId: string): Promise<IUserSocialResponse> {
        const options = getOptions(socialServiceURL, `/users/${userId}`);
        return rp.get(options);
    }

    public async getUserBy(params): Promise<IUserSocialResponse> {
        const options = getOptions(socialServiceURL, `/users/by`, params);
        return rp.get(options);
    }

    public async updateUserById(userId: string, userRequest: IUserSocialRequest): Promise<IUserSocialResponse> {
        const options = getOptions(socialServiceURL, `/users/${userId}`, null, userRequest);
        return rp.patch(options);
    }

    public async deleteUserById(userId: string): Promise<void> {
        const options = getOptions(socialServiceURL, `/users/${userId}`);
        return rp.delete(options);
    }

    public async getFriends(userId: string, page?: number, size?: number): Promise<IUserSocialResponse[]> {
        const options = getOptions(socialServiceURL, `/users/${userId}/friends`, {page, size});
        return rp.get(options);
    }

    public async addFriend(userId: string, friendId: string): Promise<void> {
        const options = getOptions(socialServiceURL, `/users/${userId}/friends/${friendId}`);
        return rp.post(options);
    }

    public async removeFriend(userId: string, friendId: string): Promise<void> {
        const options = getOptions(socialServiceURL, `/users/${userId}/friends/${friendId}`);
        return rp.delete(options);
    }

    public async getRelation(userAId: string, userBId: string): Promise<any> {
        const options = getOptions(socialServiceURL, `/users/${userAId}/relation/${userBId}`);
        return rp.get(options);
    }

    public async getGames(userId: string, page: number, size: number): Promise<[string]> {
        const options = getOptions(socialServiceURL, `/users/${userId}/games`, {page, size});
        return rp.get(options);
    }

    public async addGameToUserById(userId: string, gameId: string): Promise<void> {
        const options = getOptions(socialServiceURL, `/users/${userId}/games/${gameId}`);
        return rp.post(options);
    }

    public async removeGameOfUserById(userId: string, gameId: string): Promise<void> {
        const options = getOptions(socialServiceURL, `/users/${userId}/games/${gameId}`);
        return rp.delete(options);
    }

    public async getServerOfUserById(userId: string): Promise<IServerResponse> {
        const options = getOptions(platformServiceURL, `/users/${userId}/servers`);
        return rp.get(options);
    }
}

export default new UserService();
