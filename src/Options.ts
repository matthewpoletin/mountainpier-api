"use strict";

export default function getOptions(apiUrl, path, params?, body?, headers?) {
    return {
        body,
        headers,
        json: true,
        qs: params,
        uri: apiUrl + path,
    };
}
