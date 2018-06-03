"use strict";

import IServerResponse from "../platform/interface/IServerResponse";
import IUserSocialRequest from "./interface/IUserSocialRequest";
import IUserSocialResponse, {IUserSocialPaginated} from "./interface/IUserSocialResponse";

export default interface IUserService {
    getUsers(page?: number, size?: number, query?: string): Promise<IUserSocialPaginated>;
    createUser(userRequest: IUserSocialRequest): Promise<IUserSocialResponse>;
    getUserById(userId: string): Promise<IUserSocialResponse>;
    getUserBy(params): Promise<IUserSocialResponse>;
    updateUserById(userId: string, userRequest: IUserSocialRequest): Promise<IUserSocialResponse>;
    deleteUserById(userId: string): Promise<void>;

    getFriends(userId: string, page?: number, size?: number): Promise<IUserSocialResponse[]>;
    addFriend(userId: string, friendId: string): Promise<void>;
    removeFriend(userId: string, friendId: string): Promise<void>;
    getRelation(userAId: string, userBId: string): Promise<any>;

    getGames(userId: string, page: number, size: number): Promise<[string]>;
    addGameToUserById(userId: string, gameId: string): Promise<void>;
    removeGameOfUserById(userId: string, gameId: string): Promise<void>;

    getServerOfUserById(userId: string): Promise<IServerResponse>;
}
