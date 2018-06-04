"use strict";

import config from "../../../IConfig";
import getOptions from "../../Options";
import requestWrapper from "../authrequest";
import {IUserSocialPaginated} from "../social/interface/IUserSocialResponse";
import IGameService from "./IGameService";
import {IDeveloperPaginated} from "./interface/IDeveloperResponse";
import IGameRequest from "./interface/IGameRequest";
import IGameResponse from "./interface/IGameResponse";
import IGamePaginated from "./interface/IGameResponse";

const rp = requestWrapper({id: 3, secret: "qULETS2mSjRKMgNppMSutTPb4xb1IzqxmbNoWv9HHYoIFMuZUZ"});

const mode = process.env.NODE_ENV || "development";
const socialServiceURL = config[mode].services.social;
const marketServiceURL = config[mode].services.market;

class GameService implements IGameService {

    public async getGames(page?: number, size?: number, gamename?): Promise<IGamePaginated> {
        const options = getOptions(marketServiceURL, `/games`, {page, size, gamename});
        return rp.get(options);
    }

    public async createGame(gameRequest: IGameRequest): Promise<{ id: number; }> {
        const options = getOptions(marketServiceURL, `/games`, null, gameRequest);
        return rp.post(options);
    }

    public async getGameById(gameId: string): Promise<IGameResponse> {
        const options = getOptions(marketServiceURL, `/games/${gameId}`);
        return rp.get(options);
    }

    public async getGameBy(params): Promise<IGameResponse> {
        const options = getOptions(marketServiceURL, `/games/by`, params);
        return rp.get(options);
    }

    public async updateGameById(gameId: string, gameRequest: IGameRequest): Promise<IGameResponse> {
        const options = getOptions(marketServiceURL, `/games/${gameId}`, null, gameRequest);
        return rp.patch(options);
    }

    public async deleteGameById(gameId: string): Promise<void> {
        const options = getOptions(marketServiceURL, `/games/${gameId}`);
        return rp.delete(options);
    }

    public async getDevelopersOfGame(gameId: string, page?: number, size?: number): Promise<IDeveloperPaginated> {
        const options = getOptions(marketServiceURL, `/games/${gameId}/developers`, {page, size});
        return rp.post(options);
    }

    public async setDeveloperOfGame(gameId: string, developerId: number): Promise<IGameResponse> {
        const options = getOptions(marketServiceURL, `/games/${gameId}/developers/${developerId}`);
        return rp.post(options);
    }

    public async getOwnersOfGameById(gameId: string, page?: number, size?: number): Promise<IUserSocialPaginated> {
        const options = getOptions(socialServiceURL, `/games/${gameId}/users`);
        return rp.get(options);
    }

}

export default new GameService();
