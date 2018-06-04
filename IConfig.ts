"use strict";

interface IConfig {
    development: {
        services: {
            auth: string,
            social: string,
            market: string,
            platform: string,
            chart: string,
        };
        twitch: {
            clientId: string,
            clientSecret: string,
            redirectUri: string,
        },
    };
    production: {
        services: {
            auth: string,
            social: string,
            market: string,
            platform: string,
            chart: string,
        };
        twitch: {
            clientId: string,
            clientSecret: string,
            redirectUri: string,
        },
    };
    NoAuthCheckUrl: string[];
}

// noinspection TsLint
const config: IConfig = require("./config.json");

export default config;
