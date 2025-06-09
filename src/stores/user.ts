import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      userId: 0,
      name: '',
      balance: 0, 
      // records нужны 
      // посмотреть, реактивные ли эти элементы
    }
  },
})