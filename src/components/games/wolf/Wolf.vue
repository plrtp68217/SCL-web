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

    <Modal v-if="gameIsFirst || gameIsOver">

      <div class="modal-container">

        <h1 class="modal-container__title">
          Wolf Cathes Eggs
        </h1>

        <div v-if="gameIsOver">

          <h2 class="modal-container__score">
            Your score: {{ score }}
          </h2>

        </div>

        <div v-else>

          <h2 class="modal-container__score">
            Your best score: {{20000}}
          </h2>

        </div>

        <div class="modal-container__start-button">
          <button @click="startGame">Start</button>
        </div>

      </div>

    </Modal>

  </div>

  <img id="wolf" src="/images/wolf/wolf-sprite-sheet.png" style="display: none;">

</template>


<script setup lang="ts">
import { ref } from 'vue';

import { Board } from './classes/Board';
import { Wolf } from './classes/Wolf';
import WolfBoard from './WolfBoard.vue';
import Modal from '@/components/UI/Modal.vue';
import WolfControl from './WolfControl.vue';
import WolfHud from './WolfHud.vue';
import type { IMove } from './interfaces/emits';
import { onUnmounted } from 'vue';
import type { ILine } from './interfaces/line';
import type { Egg } from './classes/Egg';

let board: Board;
let wolf: Wolf;
let context: CanvasRenderingContext2D;

let eggs: Egg[] = [];
const maxEggsOnBoard: number = 4

const lineAngle: number = 30;
const lineLength: number = 140;

let lines: ILine[];
let lineDeviationTopY: number;
let lineDeviationBottomY: number;


function defineBoard(newBoard: Board) {
  board = newBoard;
  wolf = board.wolf;
  context = board.context;

  lineDeviationTopY = board.height * 0.3;

  lineDeviationBottomY = board.height * 0.45

  
  lines = [
    {startX: 0 , startY: lineDeviationTopY, length: lineLength, angle: lineAngle, direction: 1},
    {startX: 0, startY: board.height - lineDeviationBottomY, length: lineLength, angle: lineAngle, direction: 1},
    {startX: board.width, startY: lineDeviationTopY, length: lineLength, angle: lineAngle, direction: -1},
    {startX: board.width, startY: board.height - lineDeviationBottomY, length: lineLength, angle: lineAngle, direction: -1},
  ]
  
}

let gameIsOver = ref<boolean>(false);
let gameIsFirst = ref<boolean>(true);

let score = ref<number>(0)
let speed: number = 300;

let gameLoopID: number;

function startGame() {
  if (gameIsFirst) gameIsFirst.value = false;

  gameIsOver.value = false;

  gameLoopID = setInterval(gameLoop, speed);

}


function gameLoop() {
  board.clear();
  
  board.drawLines(lines);
  
  wolf.draw(context);
  // board.drawCollision();
}

function moveWolf({side, basket}: IMove) {
  wolf.clear(context)

  wolf.state.side = side;
  wolf.state.basket = basket;

  wolf.draw(context)
}

onUnmounted(() => {
  clearInterval(gameLoopID)
})

</script>


<style scoped>

.wolf {
  position: relative;
}

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

.modal-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  color: white;
}

</style>