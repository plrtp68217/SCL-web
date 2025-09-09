import apiClient from "./apiClient";

import type { Record, CreateRecordDto,  UpdateRecordDto } from "./types/records";


export default {
  async getRecord(userId: number, gameId: string): Promise<Record | null> {
    const response = await apiClient.get(`/records/${userId}/${gameId}`);
    const record = response.data;
    return record;
  },
  
  async getBestRecords(gameId: string): Promise<Record[] | null> {
    const response = await apiClient.get(`/records/${gameId}`);
    const records = response.data;
    return records;
  },

  async createRecord(dto: CreateRecordDto): Promise<Record> {
    const response = await apiClient.post('/records', dto);
    const record = response.data;
    return record;
  },

  async updateRecord(dto: UpdateRecordDto): Promise<Record> {
    const response = await apiClient.put('/records', dto);
    const record = response.data;
    return record;
  }
}