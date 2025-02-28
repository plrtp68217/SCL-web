<template>

  <div class="wolf-control">

    <div class="wolf-control-buttons">
      <button @click="emit('move', {side: 0, basket: 1})">LT</button>
      <button @click="emit('move', {side: 0, basket: 0})">LB</button>
    </div>
    
    <div class="wolf-control-buttons">
      <button @click="emit('move', {side: 1, basket: 1})">RT</button>
      <button @click="emit('move', {side: 1, basket: 0})">RB</button>
    </div> 

  </div>
  
</template>


<script setup lang="ts">
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
}

</style>