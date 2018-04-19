"use strict";

import IDeveloperRequest from "./interface/IDeveloperRequest";
import IDeveloperResponse from "./interface/IDeveloperResponse";
import IDeveloperPaginated from "./interface/IDeveloperResponse";
import {IGamePaginated} from "./interface/IGameResponse";

export default interface IDeveloperService {
    getDevelopers(page?: number, size?: number, query?: string): Promise<IDeveloperPaginated>;
    createDeveloper(userRequest: IDeveloperRequest): Promise<{ id: number; }>;
    getDeveloperById(developerId: number): Promise<IDeveloperResponse>;
    getDeveloperBy(params): Promise<IDeveloperResponse>;
    updateDeveloperById(developerId: number, developerRequest: IDeveloperRequest): Promise<IDeveloperResponse>;
    deleteDeveloperById(developerId: number): Promise<void>;

    getGamesOfDeveloperById(developerId: number, page?: number, size?: number): Promise<IGamePaginated>;
}
