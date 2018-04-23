"use strict";

import IChannelRequest from "./interface/IChannelRequest";
import IChannelResponse from "./interface/IChannelResponse";
import IChannelPaginated from "./interface/IChannelResponse";

export default interface IChannelService {
    getChannels(page?: number, size?: number, query?: string): Promise<IChannelPaginated>;
    createChannel(channelRequest: IChannelRequest): Promise<IChannelResponse>;
    getChannelById(channelId: number): Promise<IChannelResponse>;
    getChannelBy(params): Promise<IChannelResponse>;
    updateChannelById(channelId: number, channelRequest: IChannelRequest): Promise<IChannelResponse>;
    deleteChannelById(channelId: number): Promise<void>;
}
