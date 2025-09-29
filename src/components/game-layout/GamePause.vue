<template>

  <div class="game-pause">

    <h1 class="game-pause-title">GAME IS ON PAUSE ⏸</h1>

    <h2>Current score: {{ props.score }}</h2>
  
    <MyButton 
      class="resume-button" 
      @click="emit('resumeGame')"
    >
      RESUME
    </MyButton>

  </div>

</template>


<script setup lang="ts">

import MyButton from '../UI/MyButton.vue';

const props = defineProps({
  score: {
    type: Number,
    required: true,
  }
})

const emit = defineEmits(['resumeGame']);

</script>


<style scoped>

.game-pause {
  padding: 10px;
  color: white;
  text-align: center;
}

.resume-button {
  margin-top: 10px;
}

</style>