"use strict";

import config from "../../../IConfig";
import getOptions from "../../Options";
import requestWrapper from "../authrequest";
import IChartService from "./IChartService";

const rp = requestWrapper({id: 3, secret: "qULETS2mSjRKMgNppMSutTPb4xb1IzqxmbNoWv9HHYoIFMuZUZ"});

const mode = process.env.NODE_ENV || "development";
const chartServiceURL = config[mode].services.chart;

class ChartService implements IChartService {

    public async deleteUser(userId: string): Promise<void> {
        const options = getOptions(chartServiceURL, `/users/${userId}`, null, null, null);
        return rp.delete(options);
    }

}

export default new ChartService();
