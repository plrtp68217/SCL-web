<template>
    <div class="snake">

        <div class="snake-header">
            <SnakeBoard @board="defineBoard" />
        </div>

        <div class="snake-footer">

            <div class="snake-footer-sound">SOUND</div>

            <div class="snake-footer-control">
                <SnakeControl @move="changeDirection"/>
            </div>

            <div class="snake-footer-hud">
                <SnakeHud :score="score"/>
            </div>

        </div>

    </div>

</template>


<script setup lang="ts">
import { Board } from './classes/Board';
import { Snake } from './classes/Snake';
import { Apple } from './classes/Apple';
import { Bonuse } from './classes/Bonuse';
import SnakeBoard from './SnakeBoard.vue';
import SnakeHud from './SnakeHud.vue';
import SnakeControl from './SnakeControl.vue';
import type { IMove } from '../common/interfaces/move';
import { ref } from 'vue';
import { isChance } from '../common/utils/random';

let board: Board;

function defineBoard(newBoard: Board): void {
    board = newBoard;

    board.createSnake();
    board.createApple();

    console.log(board.snake);

    if(isChance(0.1)) {
        board.createBonuse();
    }
}

function changeDirection({axis, direction}: IMove): void {
    board.snake.axis = axis;
    board.snake.direction = direction;
}

let score = ref<number>(0)

let speed: number = 500;
let gameLoopID: number;

// gameLoopID = setInterval(gameLoop, speed);

function gameLoop(): void {
    board.clearEntitie(board.snake.blocks)

    board.snake.move()

    if (board.isCollision()) {
        // clearInterval(gameLoopID)
    }

    if (board.isFeed(board.apple)) {
        score.value += board.apple.reward;
        board.snake.enlarge();
        board.createApple();
    }

    if (board.isFeed(board.bonuse)) {
        score.value += board.bonuse.reward
    }
    
    
    board.drawBlock(board.apple)
    board.drawEntitie(board.snake.blocks)

}


</script>


<style scoped>

.snake-header {
    padding: 10px;
    border: 5px solid #3d3c3c;
    background-color: #b342f5;
}

.snake-footer {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    font-size: 17px;
    color: white;
    background-color: rgb(204, 94, 248);
    border-right: 5px solid #3d3c3c;
    border-bottom: 5px solid #3d3c3c;
    border-left: 5px solid #3d3c3c;
}

.snake-footer-sound {
    display: flex;
    align-items: center;
}

</style>
  