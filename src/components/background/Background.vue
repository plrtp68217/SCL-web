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
    animateSquares(0);

})

let canvas: HTMLCanvasElement;
let background: Board;

let squaresOnBoard: Square[] = [];
let lastTime: number = 0;
const frameInterval = 60;

function animateSquares(timestamp: number) {
    if (!lastTime) {
        lastTime = timestamp;
    }
    
    const elapsed = timestamp - lastTime;
    
    if (elapsed > frameInterval) {
        background.clearBoard()
        
        for (let square of squaresOnBoard) {
            if (square.isAnimate) {
                square.changeHsl();
            }
            else {
                square.isAnimate = Math.random() <= 0.1 ? true : false;
            }
            background.drawStrokeSquare(square);
        }
        lastTime = timestamp;
    }
    requestAnimationFrame(animateSquares);
}

const resizeBackground = () => {
    background.canvas.width = window.innerWidth;
    background.canvas.height = window.innerHeight;

    background.updateBoardSize();

    squaresOnBoard = [];

    const squareSize = 30;

    const rows = Math.ceil(background.height / squareSize);
    const columns = Math.ceil(background.width / squareSize);

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            const x = col * (squareSize + 5);
            const y = row * (squareSize + 5);
            const square = new Square(x, y, squareSize);
            squaresOnBoard.push(square);
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
  