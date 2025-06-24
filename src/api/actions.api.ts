import apiClient from "./apiClient";
import type { Action, CreateActionDto, IGameActivity, IGameActivityInterval, ISummary, ISummaryInterval } from "./types/actions";

export default {
  async getSummary(): Promise<ISummary> {
    const response = await apiClient.get('/actions/summary');
    const summary = response.data;
    return summary;
  },

  async getSummaryInterval(date_start: Date, date_end: Date): Promise<ISummaryInterval> {
    const response = await apiClient.get(`/actions/summary/${date_start}/${date_end}`);
    const summaryInterval = response.data;
    return summaryInterval;
  },

  async getGameActivity(gameId: string): Promise<IGameActivity> {
    const response = await apiClient.get(`/actions/game/${gameId}`);
    const gameActivity = response.data;
    return gameActivity;
  },

  async getGameActivityInterval(gameId: string, date_start: Date, date_end: Date): Promise<IGameActivityInterval> {
    const response = await apiClient.get(`/actions/game/${gameId}/${date_start}/${date_end}`);
    const gameActivityInterval = response.data;
    return gameActivityInterval;
  },

  async createAction(dto: CreateActionDto): Promise<Action> {
    const response = await apiClient.post('/actions', dto);
    const action = response.data;
    return action;
  }
}