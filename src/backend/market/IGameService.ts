"use strict";

import {IUserSocialPaginated} from "../social/interface/IUserSocialResponse";
import {IDeveloperPaginated} from "./interface/IDeveloperResponse";
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

    getDevelopersOfGame(gameId: string, page?: number, size?: number): Promise<IDeveloperPaginated>;
    setDeveloperOfGame(gameId: string, developerId: number): Promise<IGameResponse>;

    getOwnersOfGameById(gameId: string, page?: number, size?: number): Promise<IUserSocialPaginated>;
}
