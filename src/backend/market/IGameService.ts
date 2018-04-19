"use strict";

import {IUserPaginated} from "../social/interface/IUserResponse";
import IGameRequest from "./interface/IGameRequest";
import IGameResponse from "./interface/IGameResponse";
import IGamePaginated from "./interface/IGameResponse";

export default interface IGameService {
    getGames(page?: number, size?: number, query?: string): Promise<IGamePaginated>;
    createGame(userRequest: IGameRequest): Promise<{ id: number; }>;
    getGameById(gameId: string): Promise<IGameResponse>;
    getGameBy(params): Promise<IGameResponse>;
    updateGameById(gameId: string, gameRequest: IGameRequest): Promise<IGameResponse>;
    deleteGameById(gameId: string): Promise<void>;

    getOwners(gameId: string, page?: number, size?: number): Promise<IUserPaginated[]>;
}
