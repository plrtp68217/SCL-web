<template>
  
  <SoundPreloader :showLoader="false">

    <div>

      <div v-if="isLoading" class="error-spinner">

        <Error v-if="isError"/>
        <Spinner v-else/>

        <p class="error-spinner-text">{{ textLoading }}</p>

      </div>

      <transition name="image-fade" mode="out-in">

        <img
          v-if="showImage"
          src="/images/menu/ballerina.svg"
          alt="Transition Image"
          class="transition__image"
        />

      </transition>


      <router-view v-slot="{ Component }">

        <transition name="page-fade" mode="out-in">

          <component :is="Component" />

        </transition>

      </router-view>

    </div>

  </SoundPreloader>

</template>


<script setup lang="ts">
import { ref, watch, type Ref, onMounted } from 'vue';
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

import SoundPreloader from './common/utils/SoundPreloader.vue';


const showImage = ref<boolean>(false);

const route = useRoute();
const router = useRouter();

let isLoading = ref<boolean>(true);
let isError = ref<boolean>(false);
let textLoading: Ref<string> = ref('Получение данных с сервера...');

const userStore = useUserStore()

watch(
  () => route.path,
  () => {
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
        isLoading.value = false;
        return;
      }
    })

  const {userId, name} = getTelegramData();

  if (!userId || !name) {
    textLoading.value = '[Ошибка авторизации]: Используйте приложение Telegram.';
    isError.value = true;
    return;
  }

  loginUser({userId, name})
    .then((userData: User) => {
      userStore.setUser(userData);
      getRecords(userId, gameIds);
    })
    .then(() => {
      logUserAction({name: name, action: 'entry'});
    })
    .then(() => {
      isLoading.value = false;
    })
    .catch((error) => {
      isError.value = true;
      textLoading.value = `\n[Ошибка авторизации]: ${error}].`;
    })
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
