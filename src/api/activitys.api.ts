import apiClient from "./apiClient";
import { ApiError } from "./error/apiError";
import type { Activity } from "./types/activitys";
import type { User } from "./types/users";


class ActivitysError extends ApiError {
  constructor(message: string, funcName: string) {
    super(message, funcName);
    this.name += ' ACTIVITYS';
  }
}

export default {
  async getActivity(userId: number): Promise<Activity> {
    try {
      const response = await apiClient.get(`/activitys/${userId}`);
      const activity = response.data;
      return activity;
    }
    catch (error) {
      throw new ActivitysError(`${error}`, 'getActivity');
    }
  },

  async getReward(userId: number): Promise<User | null> {
    try {
      const response = await apiClient.get(`/activitys/reward/${userId}`);
      const user = response.data;
      return user;
    }
    catch (error) {
      throw new ActivitysError(`${error}`, 'getReward');
    }
  }
}