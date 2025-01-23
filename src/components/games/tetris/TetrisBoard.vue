<template>
    <canvas id="tetris_board" style="width: 220px; height: 400px;"></canvas>
</template>


<script setup lang="ts">

import { onMounted, onUnmounted, ref } from 'vue';
import shapes from "@/components/games/tetris/assets/shapes";

const canvas = ref<HTMLCanvasElement | null>(null);
const context = ref<CanvasRenderingContext2D | null>(null);

onMounted(() => {
    canvas.value = document.querySelector('#tetris_board') as HTMLCanvasElement;
    context.value = canvas.value.getContext('2d') as CanvasRenderingContext2D;
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
    width: 220px;
    height: 400px;
    border: 1px solid black;
    background-color: #3d3c3c;
}

</style>