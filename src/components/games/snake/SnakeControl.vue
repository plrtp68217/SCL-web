<template>
    <div class="snake-control">
        <div class="snake-control-up">
            <MyButton @click="emit('move', {axis: 'y', direction: -1})">UP</MyButton>
        </div>
        <div class="snake-control-left-right">
            <MyButton @click="emit('move', {axis: 'x', direction: -1})">LEFT</MyButton>
            <MyButton @click="emit('move', {axis: 'x', direction: 1})">RIGHT</MyButton>
        </div>
        <div class="snake-control-down">
            <MyButton @click="emit('move', {axis: 'y', direction: 1})">DOWN</MyButton>
        </div>
    </div>
</template>


<script setup lang="ts">

import type { ControlEmit } from './interfaces/emits';

import MyButton from '@/components/UI/MyButton.vue';

const emit = defineEmits<ControlEmit>();



</script>


<style scoped>

.snake-control {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
}

.snake-control-left-right {
    display: flex;
    gap: 5px;
}

</style>
