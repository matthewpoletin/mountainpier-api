"use strict";

import config from "../../../IConfig";
import getOptions from "../../Options";
import requestWrapper from "../authrequest";
import IChannelService from "./IChannelService";
import IChannelRequest from "./interface/IChannelRequest";
import IChannelResponse from "./interface/IChannelResponse";
import IChannelPaginated from "./interface/IChannelResponse";

const rp = requestWrapper({id: 3, secret: "qULETS2mSjRKMgNppMSutTPb4xb1IzqxmbNoWv9HHYoIFMuZUZ"});

const mode = process.env.NODE_ENV || "development";
const platformServiceURL = config[mode].services.platform;

class ChannelService implements IChannelService {

    public async getChannels(page?: number, size?: number, channelname?): Promise<IChannelPaginated> {
        const options = getOptions(platformServiceURL, `/channels`, {page, size, channelname});
        return rp.get(options);
    }

    public async createChannel(channelRequest: IChannelRequest): Promise<IChannelResponse> {
        const options = getOptions(platformServiceURL, `/channels`, null, channelRequest);
        return rp.post(options);
    }

    public async getChannelById(channelId: number): Promise<IChannelResponse> {
        const options = getOptions(platformServiceURL, `/channels/${channelId}`);
        return rp.get(options);
    }

    public async getChannelBy(params): Promise<IChannelResponse> {
        const options = getOptions(platformServiceURL, `/channels/by`, params);
        return rp.get(options);
    }

    public async updateChannelById(channelId: number, channelRequest: IChannelRequest): Promise<IChannelResponse> {
        const options = getOptions(platformServiceURL, `/channels/${channelId}`, null, channelRequest);
        return rp.patch(options);
    }

    public async deleteChannelById(channelId: number): Promise<void> {
        const options = getOptions(platformServiceURL, `/channels/${channelId}`);
        return rp.delete(options);
    }

}

export default new ChannelService();
