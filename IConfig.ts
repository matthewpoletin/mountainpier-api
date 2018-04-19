"use strict";

interface IConfig {
    Services: {
        Auth: {
            url: string;
            port: string;
            base: string;
        },
        Social: {
            url: string;
            port: string;
            base: string;
        },
        Market: {
            url: string;
            port: string;
            base: string;
        },
        Platform: {
            url: string;
            port: string;
            base: string;
        },
    };
    NoAuthCheckUrl: string[];
}

// noinspection TsLint
const config: IConfig = require("./config.json");

export default config;
