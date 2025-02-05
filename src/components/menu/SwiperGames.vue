<template>
    <Swiper
        :slides-per-view="1"
        :space-between="2"
        centered-slides
    >
    
    <SwiperSlide v-for="game in props.games" :key="game.label">
      <GameCard :label="game.label" :image="game.image"/>
    </SwiperSlide>

  </Swiper>

  
</template>


<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import { defineProps } from 'vue';
import type { Game } from '../views/interfaces/game';
import GameCard from './GameCard.vue';

const props = defineProps<{
    games: Game[]; // Используйте массив Game
}>();

</script>


<style scoped>

</style>
  