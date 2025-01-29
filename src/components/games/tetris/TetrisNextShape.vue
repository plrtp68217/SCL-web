<template>
    <canvas id="tetris-next-shape" style="width: 80px; height: 80px;"></canvas>
</template>


<script setup lang="ts">

import { onMounted } from 'vue';
import { Board } from './classes/Board';

let board: Board;

const emit = defineEmits<{(e: 'second_board', value: Board): void}>();

onMounted(() => {
    const canvas = document.querySelector('#tetris-next-shape') as HTMLCanvasElement;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;

    const width: number = canvas.width;
    const height: number = canvas.height;

    board = new Board(context, width, height)

    emit('second_board', board);
})

</script>


<style scoped>

#tetris-next-shape {
    width: 80px;
    height: 80px;
    border: 1px solid black;
    background-color: #3d3c3c;

}

</style>