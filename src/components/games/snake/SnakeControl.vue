<template>
    <div class="snake-control">
        <div class="snake-control-up">
            <MyButton class="control-button" @click="emit('move', {axis: 'y', direction: -1})">⇧</MyButton>
        </div>
        <div class="snake-control-left-right">
            <MyButton class="control-button" @click="emit('move', {axis: 'x', direction: -1})">⇦</MyButton>
            <MyButton class="control-button" @click="emit('move', {axis: 'x', direction: 1})">⇨</MyButton>
        </div>
        <div class="snake-control-down">
            <MyButton class="control-button" @click="emit('move', {axis: 'y', direction: 1})">⇩</MyButton>
        </div>
    </div>
</template>


<script setup lang="ts">

import { onMounted, onUnmounted } from 'vue';

import type { ControlEmit } from './interfaces/emits';

import MyButton from '@/components/UI/MyButton.vue';

const emit = defineEmits<ControlEmit>();


function moveSnakeWithKey(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') emit('move', {axis: 'x', direction: -1});
    else if (event.key === 'ArrowRight') emit('move', {axis: 'x', direction: 1});
    else if (event.key === 'ArrowDown') emit('move', {axis: 'y', direction: 1});
    else if (event.key === 'ArrowUp') emit('move', {axis: 'y', direction: -1});
}

onMounted(() => {
    document.addEventListener('keydown', moveSnakeWithKey);
})

onUnmounted(() => {
    document.removeEventListener('keydown', moveSnakeWithKey);
})



</script>


<style scoped>

.snake-control {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.control-button {
    font-size: 25px;
}

.snake-control-left-right {
    display: flex;
    gap: 2px;
}

</style>
