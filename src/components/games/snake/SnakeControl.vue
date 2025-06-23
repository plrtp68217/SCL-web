<template>
    <div class="snake-control">
        <div class="snake-control-up">
            <MyButton @click="emit('move', {axis: 'y', direction: -1})">⇧</MyButton>
        </div>
        <div class="snake-control-left-right">
            <MyButton @click="emit('move', {axis: 'x', direction: -1})">⇦</MyButton>
            <MyButton @click="emit('move', {axis: 'x', direction: 1})">⇨</MyButton>
        </div>
        <div class="snake-control-down">
            <MyButton @click="emit('move', {axis: 'y', direction: 1})">⇩</MyButton>
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
    gap: 2px;
}

.snake-control-left-right {
    display: flex;
    gap: 2px;
}

</style>
