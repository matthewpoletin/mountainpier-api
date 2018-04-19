"use strict";

import * as errs from "restify-errors";

export default function unknownMethodHandler() {
    return (req, res) => {
        if (req.method.toLowerCase() === "options") {
            const origin = req.headers.origin || "localhost";
            const allowHeaders = ["Accept", "Accept-Version", "Content-Type", "Api-Version", "Authorization", "Access-Token"];

            if (res.methods.indexOf("OPTIONS") === -1) {
                res.methods.push("OPTIONS");
            }

            res.header("Access-Control-Allow-Credentials", true);
            res.header("Access-Control-Allow-Headers", allowHeaders.join(", "));
            res.header("Access-Control-Allow-Methods", res.methods.join(", "));
            res.header("Access-Control-Allow-Origin", origin);

            res.setHeader("Content-Length", "0");
            return res.send(204);
        } else {
            return res.send(new errs.MethodNotAllowedError());
        }
    };
}
