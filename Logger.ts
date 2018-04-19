"use strict";

import * as bunyan from "bunyan";

// noinspection TsLint
const packageJson = require("./package.json");

export default bunyan.createLogger({
    name: `${packageJson.name} v${packageJson.version}`,
    streams: [
        {
            level: bunyan.DEBUG,
            stream: process.stdout,
        },
        {
            level: bunyan.ERROR,
            stream: process.stderr,
        },
    ],
});
