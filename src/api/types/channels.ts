export interface Channel {
  channelId: string;
  reward: number;
  title: string;
}

export interface CreateChannelDto {
  channelId: string;
  reward: number;
  title: string;
}

export interface CreateUserChannelDto {
  userId: number;
  channelId: string;
}

export interface DeleteChannelDto {
  channelId: string
}

export interface UpdateChannelDto {
  channelId: string
  reward: number;
  title: string;
}