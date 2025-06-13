<template>

  <div>

    <div v-if="loading" class="loading-spinner">

      <Spinner/>
      <p class="text-loading">{{ textLoading }}</p>
            
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

</template>


<script setup lang="ts">
import { ref, watch, type Ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

import Spinner from './components/spinner/Spinner.vue';

import { api } from './api';

import type { LoginUserDto } from './api/types/authorization';
import type { User } from './api/types/users';

import { getTgUserData } from './telegram/useTelegram';

import { useUserStore } from '@/stores/user';


const showImage = ref<boolean>(false);

const route = useRoute();

let loading: boolean = true;
let textLoading: Ref<string> = ref('Получение данных с сервера...');


const userStore = useUserStore()

watch(
  () => route.path, // Отслеживаем изменение пути
  () => {
    showImage.value = true; // Показываем картинку при изменении маршрута
    setTimeout(() => {
      showImage.value = false; // Скрываем картинку через 500 мс
    }, 500);
  }
);

async function loginUser(dto: LoginUserDto): Promise<User> {
    try {
        return await api.auth.login(dto);
    }
    catch (error) {
        throw new Error(`${error}`);
    }
}

onMounted(() => {
    const {userId, name} = getTgUserData();

    console.log({userId, name});
    

    if (userId && name) {
        loginUser({userId, name})
            .then((userData: User) => {
                loading = false;
                userStore.setUser(userData);
            })
            .catch((error) => {
                textLoading.value = `${error}`;
            })
    }
    else {
        textLoading.value = 'Ошибка загрузки. Перезагрузите страницу :('
    }
    
})


</script>


<style scoped>

@import url(./animations/glow.css);

/* Экран загрузки */
.loading-spinner {
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
