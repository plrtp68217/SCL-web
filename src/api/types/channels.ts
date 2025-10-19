export interface CreateChannelDto {
  channelId: string;
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
  title: string;
}