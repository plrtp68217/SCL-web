<template>

  <div 
    :class="[
      'player-card',
      position === 1 ? 'gold' : '',
      position === 2 ? 'silver' : '',
      position === 3 ? 'bronze' : '',
      userStore.getUserId == props.userId ? 'me' : ''

    ]"
  >
    {{ props.position }}. {{ props.name }} -  {{ props.score }} points
  </div>
    
</template>


<script setup lang="ts">

import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

const props = defineProps({
  userId: {
    type: Number,
    required: true
  },
  position: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
})


</script>


<style scoped>

.player-card {
  position: relative;
  padding-left: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 10px;
  backdrop-filter: blur(4px);
  margin-bottom: 10px;
}

.gold::after,
.silver::after,
.bronze::after {
  content: "";
  display: block;
  width: 15px;
  height: 15px;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.gold::after {
  background-image: url('/images/best-players/gold-cup.png');
}

.silver::after {
  background-image: url('/images/best-players/silver-cup.png');
}

.bronze::after {
  background-image: url('/images/best-players/bronze-cup.png');
}

.me {
  background-color: rgba(238, 0, 186, 0.479);
}
</style>