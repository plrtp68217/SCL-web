<template>

  <div class="wolf-control">

    <div class="wolf-control-buttons">
      <MyButton @click="emit('move', {side: 0, basket: 1})">LT</MyButton>
      <MyButton @click="emit('move', {side: 0, basket: 0})">LB</MyButton>
    </div>
    
    <div class="wolf-control-buttons">
      <MyButton @click="emit('move', {side: 1, basket: 1})">RT</MyButton>
      <MyButton @click="emit('move', {side: 1, basket: 0})">RB</MyButton>
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
  justify-content: space-around;
}

.wolf-control-buttons {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

</style>