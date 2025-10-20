import apiClient from "./apiClient";
import { ApiError } from "./error/apiError";
import type { 
  Channel,
  CreateUserChannelDto,
  CreateChannelDto,
  UpdateChannelDto,
  DeleteChannelDto
 } from "./types/channels";

class ChannelsError extends ApiError {
  constructor(message: string, funcName: string) {
    super(message, funcName);
    this.name += ' CHANNELS';
  }
}

const userTypes: string[] = ['member', 'administrator', 'creator']

const isChannelSubscriber = async (channelId: string, userId: number): Promise<boolean> => {
    try {
      const botToken = import.meta.env.VITE_BOT_TOKEN;
      const url = `https://api.telegram.org/bot${botToken}/getChatMember`;
      const response = await apiClient.post(url, {chat_id: channelId, user_id: userId});
      const chatMember = response.data.result;
      return userTypes.indexOf(chatMember.status) !== -1;
    }
    catch (error) {
      throw new ChannelsError(`${error}`, 'checkSubscription');
    }
  }

export default {
  async getAllChannels(): Promise<Channel[]> {
    try {
      const response = await apiClient.get('/channels/all');
      const channels = response.data;
      return channels;
    }
    catch (error) {
      throw new ChannelsError(`${error}`, 'getAllChannels');
    }
  },

  async getChannels(userId: number): Promise<Channel[]> {
    try {
      const response = await apiClient.get(`/channels/${userId}`);
      const channels = response.data;
      return channels;
    }
    catch (error) {
      throw new ChannelsError(`${error}`, 'getChannels');
    }
  },

  async createSubscribe(dto: CreateUserChannelDto): Promise<boolean> {
    try {
      const isSubscriber = await isChannelSubscriber(dto.channelId, dto.userId);

      if (isSubscriber == false) {
        return false;
      }

      await apiClient.post('/channels/subscribe', dto);
      return true;
    }
    catch (error) {
      throw new ChannelsError(`${error}`, 'createSubscribe');
    }
  },

  async createChannel(dto: CreateChannelDto): Promise<Channel> {
    try {
      const response = await apiClient.post('/channels/create', dto);
      const channel = response.data;
      return channel;
    }
    catch (error) {
      throw new ChannelsError(`${error}`, 'createChannel');
    }
  },

  async updateChannel(dto: UpdateChannelDto): Promise<Channel> {
    try {
      const response = await apiClient.post('/channels/update', dto);
      const channel = response.data;
      return channel;
    }
    catch (error) {
      throw new ChannelsError(`${error}`, 'updateChannel');
    }
  },

  async deleteChannel(dto: DeleteChannelDto): Promise<boolean> {
    try {
      const response = await apiClient.post('/channels/delete', dto);
      const channel = response.data;
      return channel;
    }
    catch (error) {
      throw new ChannelsError(`${error}`, 'deleteChannel');
    }
  },
}