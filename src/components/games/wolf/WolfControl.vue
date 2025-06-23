<template>

  <div class="wolf-control">

    <div class="wolf-control-buttons">
      <MyButton @click="emit('move', {side: 0, basket: 1})">⬁</MyButton>
      <MyButton @click="emit('move', {side: 1, basket: 1})">⬀</MyButton>
    </div>
    
    <div class="wolf-control-buttons">
      <MyButton @click="emit('move', {side: 0, basket: 0})">⬃</MyButton>
      <MyButton @click="emit('move', {side: 1, basket: 0})">⬂</MyButton>
    </div> 

  </div>
  
</template>


<script setup lang="ts">
import MyButton from '@/components/UI/MyButton.vue';

import type { ControlEmit } from './interfaces/emits';

const emit = defineEmits<ControlEmit>();
  
</script>


<style scoped>

.wolf-control {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.wolf-control-buttons {
  display: flex;
  gap: 2px;
}

</style>