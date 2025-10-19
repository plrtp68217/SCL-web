<template>

  <div class="best-players-view">

    <header class="header">

      <MyButton 
        :class="['header-button', gamePanels['snake'] ? 'active' : '']"
        @click="changeGamePanel('snake')"
      >
        SNAKE
      </MyButton>

      <MyButton 
        :class="['header-button', gamePanels['tetris'] ? 'active' : '']"
        @click="changeGamePanel('tetris')"
      >
        TETRIS
      </MyButton>

      <MyButton 
        :class="['header-button', gamePanels['wolf'] ? 'active' : '']"
        @click="changeGamePanel('wolf')"
      >
        WOLF
      </MyButton>

    </header>

    <main class="main">

      <div v-if="gamePanels['snake']">
        <BestPlayers
          :records="snakeRecords"
        />
      </div>

      <div v-else-if="gamePanels['tetris']">
        <BestPlayers
          :records="tetrisRecords"
        />
      </div>

      <div v-else-if="gamePanels['wolf']">
        <BestPlayers
          :records="wolfRecords"
        />
      </div>

    </main>

    <footer class="footer">

    </footer>

  </div>

    
</template>


<script setup lang="ts">

import { onMounted, ref } from 'vue';

import { api } from '@/api';

import MyButton from '../UI/MyButton.vue';
import BestPlayers from '../best-players/BestPlayers.vue';

import { type BestRecord } from '@/api/types/records';

import type { GameId } from '../games/common/types/records';

interface IGamePanels {
  [gameId: string]: boolean
}

let gamePanels = ref<IGamePanels>({
  'snake': false,
  'tetris': true,
  'wolf': false,
})

let snakeRecords = ref<BestRecord[]>([]);
let tetrisRecords = ref<BestRecord[]>([]);
let wolfRecords = ref<BestRecord[]>([]);

function changeGamePanel(gameId: GameId): void {
 for(let gamePanelId in gamePanels.value) {
    gamePanels.value[gamePanelId] = gamePanelId === gameId ? true : false
  }
}

async function getBestRecords(gameId: string): Promise<BestRecord[] | null> {
  const records: BestRecord[] | null = await api.records.getBestRecords(gameId);
  return records;
}

onMounted(async () => {
  getBestRecords('snake')
    .then((records: BestRecord[] | null) => {
      snakeRecords.value = records ? records : [];
    })

  getBestRecords('tetris')
    .then((records: BestRecord[] | null) => {
      tetrisRecords.value = records ? records : [];
    })

  getBestRecords('wolf')
    .then((records: BestRecord[] | null) => {
      wolfRecords.value = records ? records : [];
    })

})

</script>


<style scoped>

.best-players-view {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.header {
  display: flex;
  justify-content: start;
  padding: 5px 10px 0 10px;
  gap: 2px;
  border-bottom: 2px solid rgba(138, 0, 131, 0.76);
}

.header-button {
  width: auto;
  background-color: rgba(138, 0, 131, 0.76);
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  box-shadow: 2px 0 2px rgba(181, 0, 252, 0.336);
}

.active {
    background-color: rgba(206, 1, 196, 0.76);
}

.main {
  height: 100%;
  overflow: auto;
}


</style>