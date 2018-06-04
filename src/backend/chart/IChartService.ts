"use strict";

import ILoginRequest from "./interface/LoginRequest";
import ILoginResponse from "./interface/LoginResponse";
import {ILoginPaginated} from "./interface/LoginResponse";

export default interface IChartService {

    deleteUser(userId: string): Promise<void>;

}
