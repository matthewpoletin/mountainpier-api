"use strict";

import * as requestPromise from "request-promise";

export interface ICredentials {
    id: number;
    secret: string;
}

function authRequestWrapper(credentials: ICredentials) {
    let authToken = "";

    function requestWrapper(method: string) {

        return async (options: any) => {
            let response = null;
            try {
                options = authToken ? Object.assign({}, options, {headers: {"Auth-Token": authToken}}) : options;
                response = await requestPromise[method](options);
            } catch (error) {
                if (error.statusCode === 401) {
                    const authorizationHeader = {
                        Authorization: "Basic " + new Buffer(credentials.id + ":" + credentials.secret).toString("base64"),
                    };
                    options = Object.assign({}, options, {headers: authorizationHeader, resolveWithFullResponse: true});
                    response = await requestPromise[method](options);
                    authToken = response.headers["auth-token"];
                    response = response.body;
                } else {
                    throw new Error(error);
                }
            }
            return response;
        };
    }

    return {
        delete: requestWrapper("delete"),
        get: requestWrapper("get"),
        patch: requestWrapper("patch"),
        post: requestWrapper("post"),
    };
}

export default (credentials: ICredentials) => {
    return authRequestWrapper(credentials);
};
