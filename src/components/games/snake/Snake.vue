<template>
    <div class="snake">

        <div class="snake-header">
            <SnakeBoard @board="defineBoard" />
        </div>

        <div class="snake-footer">

            <div class="snake-footer-sound">SOUND</div>

            <div class="snake-footer-control">
                <SnakeControl/>
            </div>

            <div class="snake-footer-hud">
                <SnakeHud/>
            </div>

        </div>

    </div>

</template>


<script setup lang="ts">
import { Board } from './classes/Board';
import SnakeBoard from './SnakeBoard.vue';
import SnakeHud from './SnakeHud.vue';
import SnakeControl from './SnakeControl.vue';

let board: Board;

function defineBoard(newBoard: Board) {
    board = newBoard;
}

let speed: number = 200;
let gameLoopID: number;

gameLoopID = setInterval(gameLoop, speed);

function gameLoop(): void {


}

function moveSnake() {

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
  