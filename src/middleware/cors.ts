"use strict";

import * as restify from "restify";

export default function cors() {
    return (req: restify.Request, res: restify.Response, next: restify.Next) => {
        const origin = req.headers.origin || "localhost";

        res.setHeader("Access-Control-Allow-Origin", origin);
        return next();
    };
}
