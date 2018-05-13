"use strict";

import * as restify from "restify";

import requestLogging from "./src/RequestLogging";

import Logger from "./Logger";
import authCheck from "./src/middleware/authcheck";
import cors from "./src/middleware/cors";
import unknownMethodHandler from "./src/middleware/methodnotallowed";
import Router from "./src/Router";

// noinspection TsLint
const packageJson = require("./package.json");

class Index {
    private server: restify.Server;
    private port: number | string;

    constructor(port: number | string) {
        this.server = restify.createServer({
            name: packageJson.name,
            version: packageJson.version,
        });
        this.server.on("MethodNotAllowed", unknownMethodHandler());
        this.server.use(restify.plugins.queryParser());
        this.server.use(restify.plugins.bodyParser());
        this.server.use(requestLogging());
        this.server.use(cors());
        this.server.use(authCheck());
        this.auditLogging();
        this.port = port;
    }

    public init(): void {
        Router(this.server);
        this.server.on("listening", this.onListening);
        this.server.on("error", this.onError);
        this.server.listen(this.port);
    }

    private auditLogging() {
        this.server.on("after", restify.plugins.auditLogger({
            event: "after",
            log: Logger,
            server: this.server,
        }));
    }

    private onListening() {
        const address = this.server.address();
        const bind = typeof this.server.address() === "string" ? "pipe " + address : "port " + address.port;
        Logger.info(`${packageJson.name} version ${packageJson.version} started on ${bind}`);
    }

    private onError(error) {
        if (error.syscall !== "listen") {
            throw error;
        }

        const bind = typeof this.port === "string" ? "Pipe " + this.port : "Port " + this.port;

        switch (error.code) {
        case "EACCES":
            Logger.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            Logger.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
        }
    }

}

new Index(parseInt(process.argv[2], 10) || 8549).init();
