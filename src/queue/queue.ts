"use strict";

import * as rp from "request-promise";
import * as repository from "./repository";

export function activate(queue) {
    setInterval(async () => {
        const length = await repository.length(queue);
        for (let i = 0; i < length; i++) {
            const backendRequest = await repository.popFront(queue);
            try {
                const backendResponse = await rp.post(backendRequest);
                console.log("Queued BackendResponse: " + JSON.stringify(backendResponse));
            } catch (error) {
                await repository.pushFront(backendRequest, queue);
                break;
            }
        }
    }, 5000);
}
