export interface Activity {
  userId: number;
  reward: number;
  isRewarded: boolean;
  lastEntry: Date;
  streak: number;
}

export interface CreateActivityDto {
  userId: number;
}

export interface DeleteActivityDto {
  userId: number;
}

export interface UpdateActivityDto {
  userId: number;
  isRewarded: boolean;
  lastEntry: Date;
  streak: number;
}