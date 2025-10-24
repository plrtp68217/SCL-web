import { defineStore } from 'pinia'
import type { User } from '@/api/types/users'
import type { Record } from '@/api/types/records'


export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,  // Объект пользователя
    records: [] as Record[],    // Массив записей
  }),

  getters: {
    getUser: (state) => state.user,

    getName: (state) => state.user?.name,

    getUserId: (state) => state.user?.userId,

    getBalance: (state) => state.user?.balance,

    getRecords: (state) => state.records,

  },

  actions: {
    setUser(userData: User) {
      this.user = userData;
    },

    addRecord(record: Record) {
      this.records.push(record);
    },

    findRecordByGameId(gameId: string): Record {
      const record = this.records.find(record => record.gameId === gameId);
      return record!;
    },

    updateScore(gameId: string, score: number) {
      const record = this.findRecordByGameId(gameId);
      record.score = score;
    },

    updateBalance(balance: number) {
      this.user!.balance = balance;
    }
  }
})