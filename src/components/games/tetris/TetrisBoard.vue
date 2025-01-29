<template>
    <canvas id="tetris_board" width="220" height="400"></canvas>
</template>


<script setup lang="ts">

import { onMounted } from 'vue';
import { Board } from './classes/Board';

let board: Board;

const emit = defineEmits<{(e: 'main_board', value: Board): void}>();

onMounted(() => {
    const canvas = document.querySelector('#tetris_board') as HTMLCanvasElement;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;

    const width: number = canvas.width;
    const height: number = canvas.height;

    board = new Board(context, width, height)

    emit('main_board', board);
})

</script>


<style scoped>

#tetris_board {
    border: 1px solid black;
    background-color: #3d3c3c;
}

</style>