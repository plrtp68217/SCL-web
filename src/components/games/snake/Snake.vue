<template>
    <div class="snake">

        <div class="snake-header">
            <SnakeBoard @board="defineBoard" />
        </div>

        <div class="snake-footer">
            
        </div>

    </div>

</template>


<script setup lang="ts">
import SnakeBoard from './SnakeBoard.vue';
import { Board } from './classes/Board';

let board: Board;

function defineBoard(newBoard: Board) {
    board = newBoard;
    board.step = 20;
}

</script>


<style scoped></style>
  