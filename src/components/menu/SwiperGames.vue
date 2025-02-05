<template>
    <Swiper
      :effect="'coverflow'"
      :grabCursor="true"
      :centeredSlides="true"
      :slidesPerView="'auto'"
      :coverflowEffect="coverflowEffect"
      :modules="modules"
      :initialSlide="1"
      class="swiper-container"
    >
    
    <SwiperSlide class="swiper-slide" v-for="game in props.games" :key="game.label">
      <GameCard :label="game.label" :image="game.image"/>
    </SwiperSlide>

  </Swiper>

  
</template>


<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { EffectCoverflow, Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { defineProps, ref } from 'vue';
import type { Game } from '../views/interfaces/game';
import GameCard from './GameCard.vue';

const props = defineProps<{
    games: Game[];
}>();

const modules = ref([EffectCoverflow, Navigation]);

const coverflowEffect =  ref({
  rotate: 30, // Угол поворота слайдов
  stretch: 0, // Растяжение слайдов
  depth: 200, // Глубина эффекта
  modifier: 1, // Модификатор эффекта
  slideShadows: false, // Включаем тени
});

</script>


<style scoped>

.swiper-container {
  /* display: flex; */
}

.swiper-slide {
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
  