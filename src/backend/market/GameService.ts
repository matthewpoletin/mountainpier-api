"use strict";

import {IUserPaginated} from "../social/interface/IUserResponse";
import IGameRequest from "./interface/IGameRequest";
import IGameResponse from "./interface/IGameResponse";
import IGamePaginated from "./interface/IGameResponse";

import IGameService from "./IGameService";

import getOptions from "../../Options";

import config from "../../../IConfig";

import requestWrapper from "../authrequest";
const rp = requestWrapper({id: 3, secret: "qULETS2mSjRKMgNppMSutTPb4xb1IzqxmbNoWv9HHYoIFMuZUZ"});

const socialServiceURL = config.Services.Social.url + config.Services.Social.port + config.Services.Social.base;
const marketServiceURL = config.Services.Market.url + config.Services.Market.port + config.Services.Market.base;

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

    public async getOwners(gameId: string, page?: number, size?: number): Promise<IUserPaginated[]> {
        const options = getOptions(socialServiceURL, `/games/${gameId}/users`);
        return rp.get(options);
    }

}

export default new GameService();
