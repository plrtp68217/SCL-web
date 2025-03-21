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
        <WolfHud :score="score"/>
      </div>
      
    </div>

    <div class="wolf-footer">
      <WolfControl @move="moveWolf"/>
    </div>

    <Overlay v-if="gameIsFirst || gameIsOver">

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

    </Overlay>

  </div>

  <img id="wolf" src="/images/wolf/wolf-sprite-sheet.png" style="display: none;">

</template>


<script setup lang="ts">
import { ref } from 'vue';

import { Board } from './classes/Board';
import { Wolf } from './classes/Wolf';
import { Egg } from './classes/Egg';
import WolfBoard from './WolfBoard.vue';
import Overlay from '@/components/UI/Overlay.vue';
import WolfControl from './WolfControl.vue';
import WolfHud from './WolfHud.vue';
import type { IMove } from './interfaces/emits';
import { onUnmounted } from 'vue';
import type { ILine } from './interfaces/line';
import type { IEggStartPositions } from './interfaces/egg';

let board: Board;
let wolf: Wolf;
let context: CanvasRenderingContext2D;

let eggs: Egg[] = [];
const maxEggsOnBoard: number = 4;
const eggRadius = 6;
let eggsStartPositions: IEggStartPositions;

let lines: ILine[];
let lineDeviationTopY: number;
let lineDeviationBottomY: number;
const lineAngle: number = 30;
const lineLength: number = 140;


function defineBoard(newBoard: Board) {
  board = newBoard;
  wolf = board.wolf;
  context = board.context;

  lineDeviationTopY = board.height * 0.35;

  lineDeviationBottomY = board.height * 0.45
  
  lines = [
    {startX: 0 , startY: lineDeviationTopY, length: lineLength, angle: lineAngle, direction: 1},
    {startX: 0, startY: board.height - lineDeviationBottomY, length: lineLength, angle: lineAngle, direction: 1},
    {startX: board.width, startY: lineDeviationTopY, length: lineLength, angle: lineAngle, direction: -1},
    {startX: board.width, startY: board.height - lineDeviationBottomY, length: lineLength, angle: lineAngle, direction: -1},
  ]

  eggsStartPositions = {
    'topleft': {x: 0, y: lineDeviationTopY},
    'bottomleft': {x: 0, y: board.height - lineDeviationBottomY},
    'topright': {x: board.width, y: lineDeviationTopY},
    'bottomright': {x: board.width, y: board.height - lineDeviationBottomY},
  }

  const egg1 = new Egg(board, eggsStartPositions['topleft'].x, eggsStartPositions['topleft'].y - eggRadius, eggRadius)
  const egg2 = new Egg(board, eggsStartPositions['bottomleft'].x, eggsStartPositions['bottomleft'].y - eggRadius, eggRadius)
  const egg3 = new Egg(board, eggsStartPositions['topright'].x, eggsStartPositions['topright'].y - eggRadius, eggRadius)
  const egg4 = new Egg(board, eggsStartPositions['bottomright'].x, eggsStartPositions['bottomright'].y - eggRadius, eggRadius)

  console.log(egg1);

  eggs.push(...[egg1, egg2, egg3, egg4]);
  
}

let gameIsOver = ref<boolean>(false);
let gameIsFirst = ref<boolean>(true);

let score = ref<number>(0);
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

  deleteFallenEggs(eggs);
  moveAndCheckEggs(eggs, 10);
  
  wolf.draw(context);
  board.drawCollision();
}

function moveAndCheckEggs(eggs: Egg[], step: number) {
  eggs.forEach((egg) => {
    egg.draw(context);
    egg.move(lineAngle, step);

    if (egg.distanceMove > lineLength) {
      egg.isFalling = true;
      egg.distanceMove = 0;
    }
    else if (wolf.isEggInBasket(egg)) {
      score.value += 10;
      egg.isFallen = true;
    }
    else if (egg.distanceMove >= (2 * step) && egg.isFalling) {
      egg.isFallen = true;
    }
  })
}

function deleteFallenEggs(eggs: Egg[]) {
  eggs = eggs.filter((egg) => {
    console.log(!egg.isFallen);
    return !egg.isFallen
  })
}

function moveWolf({side, basket}: IMove) {
  wolf.clear(context);

  wolf.state.side = side;
  wolf.state.basket = basket;

  wolf.draw(context);
}

onUnmounted(() => {
  clearInterval(gameLoopID);
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