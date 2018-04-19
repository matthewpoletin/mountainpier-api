"use strict";

import * as restify from "restify";
import Logger from "../Logger";

export default function requestLogging() {
    return (req: restify.Request, res: restify.Response, next: restify.Next) => {
        const message = [];
        message.push(`Incoming Request: `);
        message.push(`Path: ${req.path()}`);
        message.push(`Method: ${req.method}`);
        message.push(`Params: ${JSON.stringify(req.query)}`);
        message.push(`Body: ${JSON.stringify(req.body) || null}`);
        Logger.debug(message.join(", "));
        next();
    };
}
