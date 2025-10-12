<template>

    <div class="tetris-control">

        <div class="tetris-control-linear">

            <div class="tetris-control-linear-h">
                <MyButton class="control-button" @click="emit('move', {axis: 'x', direction: -1})">⇦</MyButton>
                <MyButton class="control-button" @click="emit('move', {axis: 'x', direction: 1})">⇨</MyButton>
            </div>

            <div class="tetris-control-linear-v">
                <MyButton class="control-button" @click="emit('move', {axis: 'y', direction: 1})">⇩</MyButton>
            </div>

        </div>

        <div class="tetris-control-rotate">
            <MyButton class="control-button"  @click="emit('rotate')">⏎</MyButton>
        </div>

    </div>

</template>


<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import type { ControlEmit } from './interfaces/emits';

import MyButton from '@/components/UI/MyButton.vue';


const emit = defineEmits<ControlEmit>();

function moveShapeWithKey(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') emit('move', {axis: 'x', direction: -1});
    else if (event.key === 'ArrowRight') emit('move', {axis: 'x', direction: 1});
    else if (event.key === 'ArrowDown') emit('move', {axis: 'y', direction: 1});
    else if (event.key === 'ArrowUp') emit('rotate');
}

onMounted(() => {
    document.addEventListener('keydown', moveShapeWithKey);
})

onUnmounted(() => {
    document.removeEventListener('keydown', moveShapeWithKey);
})


</script>


<style scoped>

.tetris-control {
    width: 100%;
    display: flex;
    gap: 2px;
}

.tetris-control-linear {
    width: 70%;
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.tetris-control-linear-h {
    display: flex;
    gap: 2px;
}

.tetris-control-rotate {
    width: 30%;
    display: flex;
    justify-content: center;
}

.control-button {
    font-size: 25px;
}

</style>