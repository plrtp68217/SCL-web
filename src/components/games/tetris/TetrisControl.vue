<template>

    <div class="tetris-control">

        <div class="tetris-control-linear">

            <div class="tetris-control-linear-h">
                <MyButton @click="emit('move', {axis: 'x', direction: -1})" class="control-button">⇦</MyButton>
                <MyButton @click="emit('move', {axis: 'x', direction: 1})" class="control-button">⇨</MyButton>
            </div>

            <div class="tetris-control-linear-v">
                <MyButton @click="emit('move', {axis: 'y', direction: 1})" class="control-button">⇩</MyButton>
            </div>

        </div>

        <div class="tetris-control-rotate">
            <MyButton @click="emit('rotate')" class="control-button">⏎</MyButton>
        </div>

    </div>

</template>


<script setup lang="ts">
import type { ControlEmit } from './interfaces/emits';

import MyButton from '@/components/UI/MyButton.vue';


const emit = defineEmits<ControlEmit>();

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

</style>