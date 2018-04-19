"use strict";

Promise = require("bluebird");
const redis = Promise.promisifyAll(require("redis"));
const client = redis.createClient({
    host: "127.0.0.1",
    port: 6379,
});

client.on("error", (error) => {
    console.error("RedisError: " + error);
});

exports.pushBack = (request, queue) => {
    return client.rpushAsync(queue, JSON.stringify(request));
};

exports.pushFront = (request, queue) => {
    return client.lpushAsync(queue, JSON.stringify(request));
};

exports.popFront = (queue) => {
    return new Promise((resolve, reject) => {
        client.lpopAsync(queue).then((entity) => resolve(JSON.parse(entity)))
            .catch((err) => reject(err));
    });
};

exports.length = (queue) => {
    return client.llenAsync(queue);
};
