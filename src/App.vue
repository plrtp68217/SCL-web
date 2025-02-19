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

    
    <router-view v-slot="{ Component }">

      <transition name="page-fade" mode="out-in">

        <component :is="Component" />

      </transition>

    </router-view>

  </div>

</template>


<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const showImage = ref<boolean>(false);

const route = useRoute();

watch(
  () => route.path, // Отслеживаем изменение пути
  () => {
    showImage.value = true; // Показываем картинку при изменении маршрута
    setTimeout(() => {
      showImage.value = false; // Скрываем картинку через 500 мс
    }, 500);
  }
);


</script>


<style scoped>

@import url(./animations/glow.css);

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
