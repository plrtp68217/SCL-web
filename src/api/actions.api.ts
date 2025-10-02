import apiClient from "./apiClient";
import type { Action, 
  CreateActionDto, 
  IGameActivity, 
  IGameActivityInterval, 
  ISummary, 
  ISummaryInterval } from "./types/actions";
import { ApiError } from "./error/apiError";

class ActionError extends ApiError {
  constructor(message: string, funcName: string) {
    super(message, funcName);
    this.name += ' ACTION';
  }
}

export default {
  async getSummary(): Promise<ISummary> {
    try {
      const response = await apiClient.get('/actions/summary');
      const summary = response.data;
      return summary;
    }
    catch (error) {
      throw new ActionError(`${error}`, 'getSummary');
    }
  },

  async getSummaryInterval(date_start: Date, date_end: Date): Promise<ISummaryInterval> {
    try {
      const response = await apiClient.get(`/actions/summary/${date_start}/${date_end}`);
      const summaryInterval = response.data;
      return summaryInterval;
    }
    catch (error) {
      throw new ActionError(`${error}`, 'getSummaryInterval');
    }
  },

  async getGameActivity(gameId: string): Promise<IGameActivity> {
    try {
      const response = await apiClient.get(`/actions/game/${gameId}`);
      const gameActivity = response.data;
      return gameActivity;
    }
    catch (error) {
      throw new ActionError(`${error}`, 'getGameActivity');
    }
  },

  async getGameActivityInterval(gameId: string, date_start: Date, date_end: Date): Promise<IGameActivityInterval> {
    try {
      const response = await apiClient.get(`/actions/game/${gameId}/${date_start}/${date_end}`);
      const gameActivityInterval = response.data;
      return gameActivityInterval;
    }
    catch (error) {
      throw new ActionError(`${error}`, 'getGameActivityInterval');
    }
  },

  async createAction(dto: CreateActionDto): Promise<Action> {
    try {
      const response = await apiClient.post('/actions', dto);
      const action = response.data;
      return action;
    }
    catch (error) {
      throw new ActionError(`${error}`, 'createAction');
    }
  }
}