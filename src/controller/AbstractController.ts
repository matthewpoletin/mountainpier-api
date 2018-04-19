"use strict";

import Logger from "../../Logger";
import * as Errors from "../Errors";

import * as restify from "restify";
import * as errs from "restify-errors";

export default abstract class AbstractController {

    protected static errorHandler(error, res) {
        if (error instanceof Errors.ValidationError) {
            Logger.error({type: "Validation Error", query: error.query, message: error.message});
            return res.json(400, {
                Message: "Not valid requires parameters",
                Success: false,
                Type: "ValidationError",
            });
        } else {
            Logger.error({type: "Unclassified Error", message: error.message});
            return res.json(500, {
                Message: "Internal server error",
                Success: false,
                Type: "UnclassifiedError",
            });
        }
    }

    protected static errorResponse(error, res: restify.Response, next: restify.Next, message: string) {
        if (error.error && error.statusCode) {
            const request: any = {};
            if (error.error.error) {
                request.error = error.error.error;
            }
            if (error.error.errors) {
                request.errors = error.error.errors;
            }
            if (error.error.message) {
                request.message = error.error.message;
            }
            if (Object.keys(error).length === 0) {
                request.error = "Unprocessed request";
            }
            res.json(error.statusCode, request);
            return next();
        } else {
            return next(new errs.ServiceUnavailableError(message));
        }
    }

}
