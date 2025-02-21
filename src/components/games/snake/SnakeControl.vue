<template>
    <div class="snake-control">
        <div class="snake-control-up">
            <button @click="emit('move', {axis: 'y', direction: -1})">UP</button>
        </div>
        <div class="snake-control-left-right">
            <button @click="emit('move', {axis: 'x', direction: -1})">LEFT</button>
            <button @click="emit('move', {axis: 'x', direction: 1})">RIGHT</button>
        </div>
        <div class="snake-control-down">
            <button @click="emit('move', {axis: 'y', direction: 1})">DOWN</button>
        </div>
    </div>
</template>


<script setup lang="ts">

import type { ControlEmit } from './interfaces/emits';

const emit = defineEmits<ControlEmit>();



</script>


<style scoped>

.snake-control {
    display: flex;
    flex-direction: column;
    align-items: center;
}

</style>
