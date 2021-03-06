"use strict";

export default interface IUserRegRequest {
    username: string;
    password: string;
    role?: string;
    avatar?: string;
    regEmail?: string;
    regDate?: number;
    birthDate?: number;
    status?: string;
}
