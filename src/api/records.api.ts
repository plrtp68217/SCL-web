import apiClient from "./apiClient";

import type { Record, BestRecord, CreateRecordDto,  UpdateRecordDto } from "./types/records";

class RecordsError extends Error {
  funcName: string;

  constructor(message: string, funcName: string) {
    super(message);

    this.name += ' RECORDS';
    this.funcName = funcName;
  }
}

export default {
  async getRecord(userId: number, gameId: string): Promise<Record | null> {
    try {
      const response = await apiClient.get(`/records/user/${userId}/${gameId}`);
      const record = response.data;
      return record;
    }
    catch (error) {
      throw new RecordsError(`${error}`, 'getRecord');
    }
  },
  
  async getBestRecords(gameId: string): Promise<BestRecord[] | null> {
    try {
      const response = await apiClient.get(`/records/game/${gameId}`);
      const records = response.data;
      return records;
    }
    catch (error) {
      throw new RecordsError(`${error}`, 'getBestRecords');
    }
  },

  async createRecord(dto: CreateRecordDto): Promise<Record> {
    try {
      const response = await apiClient.post('/records', dto);
      const record = response.data;
      return record;
    }
    catch (error) {
      throw new RecordsError(`${error}`, 'createRecord');
    }
  },

  async updateRecord(dto: UpdateRecordDto): Promise<Record> {
    try {
      const response = await apiClient.put('/records', dto);
      const record = response.data;
      return record;
    }
    catch (error) {
      throw new RecordsError(`${error}`, 'updateRecord');
    }
  }
}