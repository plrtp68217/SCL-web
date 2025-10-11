<template>
  <div class="sound-control">
    <div class="sound-slider-container">
      <input 
        v-model="backgroundSoundLevel"
        type="range" 
        class="sound-slider" 
        id="volumeSlider" 
        min="0" 
        max="100" 
        >
      <span v-if="backgroundSoundLevel >= 70" class="sound-icon">🔊</span>
      <span v-else-if="backgroundSoundLevel <= 70 && backgroundSoundLevel >= 30" class="sound-icon">🔉</span>
      <span v-else-if="backgroundSoundLevel <= 30" class="sound-icon">🔈</span>
      <span class="volume-percentage" id="volumePercentage">{{ backgroundSoundLevel }}%</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSound } from '@/common/utils/useSound';

const { backgroundSoundLevel } = useSound();

</script>

<style scoped>

.sound-control {
  display: flex;
  gap: 10px;
  position: fixed;
  z-index: 10;
  font-family: inherit;
  color: white;
}

</style>