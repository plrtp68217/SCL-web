import { defineStore } from 'pinia'
import type { User } from '@/api/types/users'
import type { Record } from '@/api/types/records'


export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,  // Объект пользователя
    records: [] as Record[],    // Массив записей
  }),

  getters: {
    getName: (state) => state.user?.name,

    getBalance: (state) => state.user?.balance,

    getRecords: (state) => state.records,
  },

  actions: {
    setUser(userData: User) {
      this.user = userData;
    },

    addRecord(record: Record) {
      this.records.push(record);
    }
  }
})