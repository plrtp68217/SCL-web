<template>
    <Swiper
      :effect="'coverflow'"
      :grabCursor="true"
      :centeredSlides="true"
      :slidesPerView="'auto'"
      :coverflowEffect="coverflowEffect"
      :modules="modules"
      :initialSlide="1"
      :autoplay="autoplayOptions"
      class="swiper-container"
    >
    
    <SwiperSlide class="swiper-slide" v-for="game in props.games" :key="game.label">
      <GameCard :game="game" />
    </SwiperSlide>

  </Swiper>

  
</template>


<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { EffectCoverflow, Navigation, Autoplay  } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { ref } from 'vue';
import type { Game } from './interfaces/game';
import GameCard from './GameCard.vue';

const props = defineProps<{
    games: Game[];
}>();

const modules = ref([EffectCoverflow, Navigation, Autoplay]);

const coverflowEffect =  ref({
  rotate: 50, // Угол поворота слайдов
  stretch: 0, // Растяжение слайдов
  depth: 200, // Глубина эффекта
  modifier: 1, // Модификатор эффекта
  slideShadows: false, // Выключаем тени
});

const autoplayOptions = {
  delay: 3000, // Задержка между слайдами (3 секунды)
  disableOnInteraction: false, // Останавливать автопрокрутку при взаимодействии
}

</script>


<style scoped>

.swiper-slide {
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
  