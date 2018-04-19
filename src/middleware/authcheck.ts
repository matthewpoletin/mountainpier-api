"use strict";

import * as restify from "restify";

import config from "../../IConfig";
import logger from "../../logger";
import authService from "../backend/auth/AuthService";

export default function authCheck() {
    return async (req: restify.Request, res: restify.Response, next: restify.Next) => {
        let skipAuthCheck = false;
        config.NoAuthCheckUrl.forEach((url) => {
            if (new RegExp(url).test(req.url)) { skipAuthCheck = true; }
        });
        if (skipAuthCheck) { return next(); }

        if (!req.headers["access-token"]) {
            res.json(401, { Success: false });
        } else {
            try {
                const accessToken = req.headers["access-token"].toString();
                const indexOfDelimiter = accessToken.lastIndexOf(":");
                if (indexOfDelimiter && parseInt(accessToken.slice(indexOfDelimiter + 1, accessToken.length), 10)) {
                    req.username = (await authService.OAuthCheck({accessToken})).username;
                } else {
                    req.username = (await authService.check({accessToken})).username;
                }
                return next();
            } catch (error) {
                logger.error("Auth-Check: " + error);
                res.json(401, { Success: false });
            }
        }
    };
}
