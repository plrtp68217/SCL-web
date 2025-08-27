<template>
    <canvas id="board" width="320" height="420"></canvas>
</template>


<script setup lang="ts">
import { onMounted } from 'vue';
import { Board } from './classes/Board';
import type { BoardEmit } from './interfaces/emits';

let board: Board;

const emit = defineEmits<BoardEmit>();

onMounted(() => {
    const canvas = document.querySelector('#board') as HTMLCanvasElement;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;

    const width: number = canvas.width;
    const height: number = canvas.height;

    const sprite = document.getElementById('snake') as HTMLImageElement;

    board = new Board(context, width, height, sprite);

    emit('board', board);
})

</script>


<style scoped>

#board {
    border: 1px solid black;
    background-color: #3d3c3c;
}

</style>