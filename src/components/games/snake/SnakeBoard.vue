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

    const apple_spritesheet = document.getElementById('apple_spritesheet') as HTMLImageElement;
    const snakebody_spritesheet = document.getElementById('snakebody_spritesheet') as HTMLImageElement;

    const snakeheadtop_spritesheet = document.getElementById('snakeheadtop_spritesheet') as HTMLImageElement;
    const snakeheadbottom_spritesheet = document.getElementById('snakeheadbottom_spritesheet') as HTMLImageElement;
    const snakeheadleft_spritesheet = document.getElementById('snakeheadleft_spritesheet') as HTMLImageElement;
    const snakeheadright_spritesheet = document.getElementById('snakeheadright_spritesheet') as HTMLImageElement;

    board = new Board(
        context, 
        width, 
        height,
        
        apple_spritesheet,
        snakebody_spritesheet,

        snakeheadtop_spritesheet,
        snakeheadbottom_spritesheet,
        snakeheadleft_spritesheet,
        snakeheadright_spritesheet,
    );

    emit('board', board);
})

</script>


<style scoped>

#board {
    border: 1px solid black;
    background-color: #3d3c3c;
}

</style>