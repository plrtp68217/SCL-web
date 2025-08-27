<template>
    <canvas id="background" width="100%" height="100%"></canvas>
</template>


<script setup lang="ts">
import { onMounted } from 'vue';
import { Board } from './classes/Board';
import { Square } from "./classes/Square.js";

onMounted(() => {
    canvas = document.querySelector('#background')!;
    background = new Board(canvas);
    window.addEventListener('resize', resizeBackground);
    resizeBackground();
})

let canvas: HTMLCanvasElement;
let background: Board;

const resizeBackground = () => {
    background.canvas.width = window.innerWidth;
    background.canvas.height = window.innerHeight;

    background.updateBoardSize();

    const squareSize = 30;

    const rows = Math.ceil(background.height / squareSize);
    const columns = Math.ceil(background.width / squareSize);

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            const x = col * (squareSize + 5);
            const y = row * (squareSize + 5);
            const square = new Square(x, y, squareSize);
            background.drawStrokeSquare(square);
        }
    }
}

</script>


<style scoped>

#background {
    background-color: rgba(0, 0, 0, 0.274);
    display: block;
    position: fixed;
    z-index: -1;
}

</style>
  