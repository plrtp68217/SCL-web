<template>

  <div>
    <transition name="image-fade">
      <img
        v-if="showImage"
        src="/images/menu/ballerina.svg"
        alt="Transition Image"
        class="transition-image"
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

/* Стили и анимации остаются такими же, как в предыдущем примере */
.image-fade-enter-active,
.image-fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.image-fade-enter-from,
.image-fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.5s ease;
}

.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
}

.transition-image {
  position: fixed;
  z-index: 1000;
  top: 15%;
  width: 100%;
}

</style>
