<template>
  <div class="admin">

    <h1 class="admin-label">
      Админ панель SCL G
    </h1>

    <p class="error-text" v-if="errorText">{{ errorText }}</p>

    <div class="admin-actions">

      <div class="admin-action">

        <h2>За все время:</h2>

        <p>
          Число входов: {{ summary.entrysCount }}
        </p>

        <p >
          Число активностей по всем играм: {{ summary.actionsCount }}
        </p>

        <button @click="updateSummary">Обновить</button>

      </div>

      <div class="admin-action">

        <h2>За интервал времени:</h2>

        
        <label for="date-start">Дата с</label>
        <input
          v-model="dateStartSummaryInterval" 
          id="date-start" 
          type="date"
        >
        
        <label for="date-end">Дата по</label>
        <input 
          v-model="dateEndSummaryInterval" 
          id="date-end" 
          type="date"
        >

        <button @click="updateSummaryInterval">Поиск</button>

        <p>
          Число входов: {{ summaryInterval.entrysCountInterval || '' }}
        </p>

        <p>
          Число активностей по всем играм: {{ summaryInterval.actionsCountInterval || '' }}
        </p>

      </div>

      <div class="admin-action">

        <h2>По конкретной игре за все время:</h2>

        <select v-model="selectedGame">

          <option disabled value="">Выберите игру</option>

          <option
            v-for="gameId in gameIds"
            :key="gameId"
            :value="gameId"
          >
            {{ gameId }}
          </option>

        </select>

        <button @click="updateGameActivity">Поиск</button>

        <p>
          Число активностей: {{ gameActivity || '' }}
        </p>

      </div>

      <div class="admin-action">

        <h2>По конкретной игре за интервал времени:</h2>

        <label for="date-start">Дата с</label>
        <input
          v-model="dateStartGameActivity" 
          id="date-start" 
          type="date"
        >
        
        <label for="date-end">Дата по</label>
        <input 
          v-model="dateEndGameActivity" 
          id="date-end" 
          type="date"
        >

        <select v-model="selectedGameInterval">

          <option disabled value="">Выберите игру</option>

          <option
            v-for="gameId in gameIds"
            :key="gameId"
            :value="gameId"
          >
            {{ gameId }}
          </option>

        </select>

        <button @click="updateGameActivityInterval">Поиск</button>

        <p>
          Число активностей: {{ gameActivityInterval || '' }}
        </p>

      </div>

    </div>

    <p>* Вход - запуск приложения</p>
    <p>** Активность - вход в игру внунтри приложения</p>

  </div>

</template>


<script setup lang="ts">

import { onMounted, ref } from 'vue';
import { api } from '@/api';
import type { ISummary, ISummaryInterval } from '@/api/types/actions';

import { gameIds } from '@/common/games';
import type { GameId } from '../games/common/types/records';

let summary = ref<ISummary>({} as ISummary);
let summaryInterval = ref<ISummaryInterval>({} as ISummaryInterval);

let dateStartSummaryInterval = ref<Date>();
let dateEndSummaryInterval = ref<Date>();

let gameActivity = ref<number | string>(0);
let gameActivityInterval = ref<number | string>(0);

let dateStartGameActivity = ref<Date>();
let dateEndGameActivity = ref<Date>();

let selectedGame = ref<GameId>('' as GameId);
let selectedGameInterval = ref<GameId>('' as GameId);


let errorText = ref<string>('');

async function updateSummaryInterval() {
  if (dateStartSummaryInterval.value && dateEndSummaryInterval.value) {

    api.actions.getSummaryInterval(
      dateStartSummaryInterval.value, 
      dateEndSummaryInterval.value
    )
      .then((summaryIntervalData) => {
        errorText.value = '';
        summaryInterval.value = summaryIntervalData;
      })
      .catch((error) => {
        errorText.value = `updateSummaryInterval: ${error}`;
      })
  }
  else {
    errorText.value = 'Error: Введите обе даты';
  }
}

async function updateSummary() {
  api.actions.getSummary()
    .then((summaryData) => {
      errorText.value = '';
      summary.value = summaryData;
    })
    .catch((error) => {
      errorText.value = `updateSummary: ${error}`;
    })
}

async function updateGameActivity() {
  api.actions.getGameActivity(selectedGame.value)
    .then((gameActivityData) => {
      errorText.value = '';
      gameActivity.value = gameActivityData.gameActivity;
    })
    .catch((error) => {
      errorText.value = `updateGameActivity: ${error}`;
    })
}

async function updateGameActivityInterval() {
  if (dateStartGameActivity.value && dateEndGameActivity.value) {
    api.actions.getGameActivityInterval(
      selectedGameInterval.value,
      dateStartGameActivity.value,
      dateEndGameActivity.value,
    )
      .then((gameActivityIntervalData) => {
        errorText.value = '';
        gameActivityInterval.value = gameActivityIntervalData.gameActivityInterval;
      })
      .catch((error) => {
        errorText.value = `updateGameActivityInterval: ${error}`;
      }
    );
  }
  else {
    errorText.value = 'Error: Введите обе даты';
  }
}

onMounted(() => {
  updateSummary();
})


</script>


<style scoped>

.error-text {
  color: red;
}

.admin {
  height: 100vh;
  background: #003030;
  display: flex;
  gap: 20px;
  flex-direction: column;
  align-items: center;
  padding: 10px 15px;
  color: white;
}

.admin-label {
  color: rgb(176, 224, 236);
}

.admin-actions {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  background-color: #0f383b;
  border: 2px solid rgb(5, 100, 107);
  border-radius: 10px;
  transition: transform 1s ease-in-out;
}

.admin-action {
  display: flex;
  flex-direction: column;
}

</style>