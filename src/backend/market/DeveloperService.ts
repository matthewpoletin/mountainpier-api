"use strict";

import config from "../../../IConfig";
import getOptions from "../../Options";
import requestWrapper from "../authrequest";
import IDeveloperService from "./IDeveloperService";
import IDeveloperRequest from "./interface/IDeveloperRequest";
import IDeveloperResponse from "./interface/IDeveloperResponse";
import IDeveloperPaginated from "./interface/IDeveloperResponse";
import {IGamePaginated} from "./interface/IGameResponse";

const rp = requestWrapper({id: 3, secret: "qULETS2mSjRKMgNppMSutTPb4xb1IzqxmbNoWv9HHYoIFMuZUZ"});

const mode = process.env.NODE_ENV || "development";
const socialServiceURL  = config[mode].services.social;
const marketServiceURL  = config[mode].services.market;

class DeveloperService implements IDeveloperService {

    public async getDevelopers(page?: number, size?: number, developername?): Promise<IDeveloperPaginated> {
        const options = getOptions(marketServiceURL, `/developers`, {page, size, developername});
        return rp.get(options);
    }

    public async createDeveloper(developerRequest: IDeveloperRequest): Promise<{ id: number; }> {
        const options = getOptions(marketServiceURL, `/developers`, null, developerRequest);
        return rp.post(options);
    }

    public async getDeveloperById(developerId: number): Promise<IDeveloperResponse> {
        const options = getOptions(marketServiceURL, `/developers/${developerId}`);
        return rp.get(options);
    }

    public async getDeveloperBy(params): Promise<IDeveloperResponse> {
        const options = getOptions(marketServiceURL, `/developers/by`, params);
        return rp.get(options);
    }

    public async updateDeveloperById(developerId: number, developerRequest: IDeveloperRequest): Promise<IDeveloperResponse> {
        const options = getOptions(marketServiceURL, `/developers/${developerId}`, null, developerRequest);
        return rp.patch(options);
    }

    public async deleteDeveloperById(developerId: number): Promise<void> {
        const options = getOptions(marketServiceURL, `/developers/${developerId}`);
        return rp.delete(options);
    }

    public async getGamesOfDeveloperById(developerId: number, page?: number, size?: number): Promise<IGamePaginated> {
        const options = getOptions(marketServiceURL, `/developers/${developerId}/games`);
        return rp.get(options);
    }

}

export default new DeveloperService();
