export interface Channel {
  id: number;
  channelLink: string;
  reward: number;
  title: string;
  description: string;
}

export interface ISubscribeStatus {
  channelLink: string;
  isSubscribed: boolean;
}

export interface CreateChannelDto {
  channelLink: string;
  reward: number;
  title: string;
  description: string;
}

export interface CreateUserChannelDto {
  userId: number;
  channelId: number;
}

export interface DeleteChannelDto {
  id: number;
}

export interface UpdateChannelDto {
  channelLink: string
  reward: number;
  title: string;
  description: string;
}