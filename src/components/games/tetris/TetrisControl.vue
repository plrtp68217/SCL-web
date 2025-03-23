<template>

    <div class="tetris-control">

        <div class="tetris-control-linear">

            <div class="tetris-control-linear-h">
                <MyButton @click="emit('move', {axis: 'x', direction: -1})" class="control-button">LEFT</MyButton>
                <MyButton @click="emit('move', {axis: 'x', direction: 1})" class="control-button">RIGHT</MyButton>
            </div>

            <div class="tetris-control-linear-v">
                <MyButton @click="emit('move', {axis: 'y', direction: 1})" class="control-button">DOWN</MyButton>
            </div>

        </div>

        <div class="tetris-control-rotate">
            <MyButton @click="emit('rotate')" class="control-button">ROTATE</MyButton>
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
    width: 70%;
    display: flex;
    justify-content: space-between;
}

.tetris-control-linear {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
}

.tetris-control-linear-h {
    display: flex;
    gap: 5px;
}

.tetris-control-rotate {
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>