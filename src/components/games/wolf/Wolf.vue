<template>

  <div class="wolf">

    <div class="wolf-header">
      <WolfBoard @board="defineBoard"/>
    </div>

    <div class="wolf-main">

      <div class="wolf-main-sound">
        SOUND
      </div>

      <div class="wolf-main-hud">
        <WolfHud/>
      </div>
      
    </div>

    <div class="wolf-footer">
      <WolfControl @move="moveWolf"/>
    </div>

  </div>

  <img id="wolf" src="/images/wolf/wolf-sprite-sheet.png" style="display: none;">

</template>


<script setup lang="ts">
import { Board } from './classes/Board';
import { Wolf } from './classes/Wolf';
import WolfBoard from './WolfBoard.vue';
import WolfControl from './WolfControl.vue';
import WolfHud from './WolfHud.vue';
import type { IMove } from './interfaces/emits';
import { onUnmounted } from 'vue';

let board: Board;
let wolf: Wolf;
let context: CanvasRenderingContext2D;

function defineBoard(newBoard: Board) {
  board = newBoard;
  wolf = board.wolf;
  context = board.context;
}

let speed: number = 200;
let gameLoopID: number;

gameLoopID = setInterval(gameLoop, speed);

function gameLoop() {
  wolf.draw(context);
  board.drawCollision();

  wolf.clear(context);
  // board.clearCollision();
}

function moveWolf({side, basket}: IMove) {
  wolf.state.side = side;
  wolf.state.basket = basket;
}

onUnmounted(() => {
  clearInterval(gameLoopID)
})

</script>


<style scoped>

.wolf-header {
  padding: 10px;
  border: 5px solid #3d3c3c;
  background-color: #b342f5;

}

.wolf-main {
  padding: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: rgb(204, 94, 248);
  border-left: 5px solid #3d3c3c;
  border-right: 5px solid #3d3c3c;
  color: white;
}

.wolf-footer {
  border: 5px solid #3d3c3c;
  border-top: none;
  padding: 10px;
  background-color: rgb(204, 94, 248);

}

</style>