"use strict";

import IServerResponse from "../platform/interface/IServerResponse";
import IUserRequest from "./interface/IUserRequest";
import IUserResponse from "./interface/IUserResponse";
import IUserPaginated from "./interface/IUserResponse";

export default interface IUserService {
    getUsers(page?: number, size?: number, query?: string): Promise<IUserPaginated>;
    createUser(userRequest: IUserRequest): Promise<{ id: number; }>;
    getUserById(userId: string): Promise<IUserResponse>;
    getUserBy(params): Promise<IUserResponse>;
    updateUserById(userId: string, userRequest: IUserRequest): Promise<IUserResponse>;
    deleteUserById(userId: string): Promise<void>;

    getFriends(userId: string, page?: number, size?: number): Promise<IUserResponse[]>;

    getGames(userId: string, page: number, size: number): Promise<[string]>;
    addGameToUserById(userId: string, gameId: string): Promise<void>;
    removeGameOfUserById(userId: string, gameId: string): Promise<void>;

    getServerOfUserById(userId: string): Promise<IServerResponse>;
}
