<template>
    <canvas id="main_board" width="260" height="500"></canvas>
</template>


<script setup lang="ts">
import { onMounted } from 'vue';
import { Board } from './classes/Board';
import type { MainBoardEmit } from './interfaces/emits'

let board: Board;

const emit = defineEmits<MainBoardEmit>();

onMounted(() => {
    const canvas = document.querySelector('#main_board') as HTMLCanvasElement;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;

    const width: number = canvas.width;
    const height: number = canvas.height;

    board = new Board(context, width, height);

    emit('main_board', board);
})

</script>


<style scoped>

#main_board {
    border: 1px solid black;
    background-color: #3d3c3c;
}

</style>