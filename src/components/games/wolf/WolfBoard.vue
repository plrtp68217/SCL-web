<template>
    <canvas id="board" width="340" height="260"></canvas>
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

    const spriteSheet = document.getElementById('wolf') as HTMLImageElement;

    board = new Board(context, width, height, spriteSheet);

    emit('board', board);
})


</script>


<style scoped>

#board {
    border: 1px solid rgba(128, 2, 86, 0.507);
    background-color: #3d3c3c;
    background-image: url('/images/wolf/wolf_background.png');
}

</style>