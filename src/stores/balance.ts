import { defineStore } from 'pinia'

export const useBalanceStore = defineStore('balance', {
  state: () => {
    return {
      balance: 0,
    }
  },
})