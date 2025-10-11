<template>

  <div>

    <transition name="image-fade" mode="out-in">
      <img
        v-if="showImage"
        src="/images/menu/ballerina.svg"
        alt="Transition Image"
        class="transition__image"
      />
    </transition>

    <div v-if="appStatus === Status.PENDING" class="error-spinner">
      <Spinner/>
      <p class="error-spinner-text">{{ textLoading }}</p>
    </div>

    <div v-else-if="appStatus === Status.ERROR" class="error-spinner">
      <Error/>
      <p class="error-spinner-text">{{ textLoading }}</p>
    </div>

    <div v-else>
      <router-view v-slot="{ Component }">
        <transition name="page-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>

  </div>

</template>


<script setup lang="ts">
import { ref, watch, type Ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import Spinner from './components/spinner/Spinner.vue';
import Error from './components/error/Error.vue';

import { api } from './api';

import type { LoginUserDto } from './api/types/authorization';
import type { User } from './api/types/users';

import type { GameId } from './components/games/common/types/records';
import type { Record } from './api/types/records';

import { getTelegramData } from './telegram/useTelegram';
import { gameIds } from './common/games';

import { useUserStore } from '@/stores/user';
import { logUserAction } from './logging/logUserAction';

import { preloadSounds } from './common/utils/preloadSounds';

import { ApiError } from './api/error/apiError';

enum Status { PENDING, SUCCESS, ERROR };

const showImage = ref<boolean>(false);

const route = useRoute();
const router = useRouter();

let userId: number | undefined;
let name: string | undefined;

let isError = ref<boolean>(false);
let textLoading: Ref<string> = ref('');

const loadStatuses = {
  login: ref<Status>(Status.PENDING),
  records: ref<Status>(Status.PENDING),
  logging: ref<Status>(Status.PENDING),
  music: ref<Status>(Status.PENDING),
};

let appStatus = computed<Status>(() => {
  const statuses = Object.keys(loadStatuses).map(key => loadStatuses[key as keyof typeof loadStatuses].value);
  
  if (statuses.some(s => s === Status.ERROR)) {
    return Status.ERROR;
  }
  
  if (statuses.every(s => s === Status.SUCCESS)) {
    return Status.SUCCESS;
  }
  
  return Status.PENDING;
});

const userStore = useUserStore()

watch(
  () => route.path,
  (_old, _new) => {
    showImage.value = true;
    setTimeout(() => {
      showImage.value = false;
    }, 500);
  }
);

async function loginUser(dto: LoginUserDto): Promise<User> {
  return await api.auth.login(dto);
}

async function getRecords(userId: number, gameIds: GameId[]) {
  for (const gameId of gameIds) {
    let record: Record | null;
    record = await api.records.getRecord(userId, gameId);

    if (!record) {
        record = await api.records.createRecord({userId, gameId});
    }

    userStore.addRecord(record);
  }
}

onMounted(async () => {
  router.isReady()
    .then(() => {
      if (route.path === '/admin') {
        return;
      }
    })

  const telegramData = getTelegramData();
  userId = telegramData.userId;
  name = telegramData.name;

  if (userId == undefined || name == undefined) {
    textLoading.value += '[ERROR]: USE Telegram.';
    isError.value = true;
    return;
  }

  try {
    textLoading.value += '\nAUTHORIZATION.';
    const userData = await loginUser({ userId, name });
    userStore.setUser(userData);
    loadStatuses.login.value = Status.SUCCESS;
  }
  catch (error) {
    const customError = error as ApiError;
    isError.value = true;
    textLoading.value += `\n[API_ERROR]: ERROR_NAME - ${customError.name}. ERROR_FUNC - ${customError.funcName}.`;
  }

  try {
    textLoading.value += '\nRECORDS.';
    await getRecords(userId!, gameIds);
    loadStatuses.records.value = Status.SUCCESS;
  }
  catch (error) {
    const customError = error as ApiError;
    isError.value = true;
    textLoading.value += `\n[API_ERROR]: ERROR_NAME - ${customError.name}. ERROR_FUNC - ${customError.funcName}.`;
  }

  try {
    textLoading.value += '\nLOGGING.';
    await logUserAction({ name: name!, action: 'entry' });
    loadStatuses.logging.value = Status.SUCCESS;
  }
  catch (error) {
    const customError = error as ApiError;
    isError.value = true;
    textLoading.value += `\n[API_ERROR]: ERROR_NAME - ${customError.name}. ERROR_FUNC - ${customError.funcName}.`;
  }

  try {
    textLoading.value += '\nMUSIC.';
    await preloadSounds();
    loadStatuses.music.value = Status.SUCCESS;
  }
  catch (error) {
    const customError = error as Error;
    isError.value = true;
    textLoading.value += `\n[MUSIC_ERROR]: ERROR_NAME - ${customError.name}. ERROR_MSG - ${customError.message}.`;
  }
})

</script>

<style scoped>

@import url(./animations/glow.css);

/* Экран загрузки */
.error-spinner {
    position: fixed;
    background-color: #09122C;
    width: 100%;
    height: 100%;
    z-index: 100;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    align-items: center;
    color: white;
}

.error-spinner-text {
  text-align: center;
  padding: 0 20px;
}

.image-fade-enter-active,
.image-fade-leave-active {
  transition: opacity 1s ease, transform 1s ease;
}

.image-fade-enter-from,
.image-fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 1s ease;
}

.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
}

.transition__image {
  position: fixed;
  height: 60%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: glow 1s ease;
}

</style>
