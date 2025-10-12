<template>
  <div class="sound-control">
    <div class="sound-slider-container">
      <span class="sound-icon">SOUND</span>
      <input 
        v-model="backgroundSoundLevel"
        type="range" 
        class="sound-slider" 
        id="volumeSlider" 
        min="0" 
        max="100" 
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSound } from '@/common/utils/useSound';

const { backgroundSoundLevel } = useSound();

</script>

<style scoped>

.sound-control {
  font-family: inherit;
  color: white;
}

.sound-slider-container {
  display: flex;
  gap: 10px;
  font-size: 24px;
}

.sound-slider {
  accent-color: #9f28ee;
  width: 100px;
}

</style>