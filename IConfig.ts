"use strict";

interface IConfig {
    development: {
        services: {
            auth: string,
            social: string,
            market: string,
            platform: string,
        };
        twitch: {
            clientId: string,
            clientSecret: string,
        },
    };
    production: {
        services: {
            auth: string,
            social: string,
            market: string,
            platform: string,
        };
        twitch: {
            clientId: string,
            clientSecret: string,
        },
    };
    NoAuthCheckUrl: string[];
}

// noinspection TsLint
const config: IConfig = require("./config.json");

export default config;
