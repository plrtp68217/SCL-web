<template>
    <canvas id="tetris_board" width="220" height="400"></canvas>
</template>


<script setup lang="ts">

import { onMounted, onUnmounted, ref } from 'vue';
import euclidAlg from './utils/euclidAlg';
import shapes from "@/components/games/tetris/assets/shapes";

const canvas = ref<HTMLCanvasElement | null>(null);
const context = ref<CanvasRenderingContext2D | null>(null);

const boardWidth = ref<number | null>(null);
const boardHeight = ref<number | null>(null);

const blockSize = ref<number | null>(null);

onMounted(() => {
    canvas.value = document.querySelector('#tetris_board') as HTMLCanvasElement;
    context.value = canvas.value.getContext('2d') as CanvasRenderingContext2D;

    boardWidth.value = canvas.value.width;
    boardHeight.value = canvas.value.height;

    blockSize.value = euclidAlg(boardWidth.value, boardHeight.value);

    

})

onUnmounted(() => {
    clearInterval(gameLoopID);
});

let gameSpeed = 200;
let gameLoopID = setInterval(gameLoop, gameSpeed);

let secondShape = {};
let shapesOnBoard = [];
let nextShape = {};


function gameLoop() {

}


</script>


<style scoped>

#tetris_board {
    border: 1px solid black;
    background-color: #3d3c3c;
}

</style>