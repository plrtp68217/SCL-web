<template>
    <canvas id="tetris_board" style="width: 220px; height: 400px;"></canvas>
</template>


<script setup lang="ts">

import shapes from "@/components/games/tetris/assets/shapes";

const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
const context = canvas.getContext('2d') as CanvasRenderingContext2D;

let secondShape = {};
let shapesOnBoard = [];
let nextShape = {};

let gameSpeed = 200;

function gameLoop() {

}

let gameLoopID = setInterval(gameLoop, gameSpeed);


</script>


<style scoped>

#tetris_board {
    width: 220px;
    height: 400px;
    border: 1px solid black;
    background-color: #3d3c3c;
}

</style>