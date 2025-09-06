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
        <WolfHud
          :score="score"
          :lives="lives"
        />
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
            Your best score: {{ props.bestScore }}
          </h2>

        </div>

        <div class="modal-container__start-button">
          <MyButton @click="startGame">Start</MyButton>
        </div>

      </div>

    </Overlay>

  </div>

  <img id="wolf" src="/images/wolf/wolf-sprite-sheet.png" style="display: none;">

</template>


<script setup lang="ts">
import { ref, onUnmounted, watch } from 'vue';

import { Board } from './classes/Board';
import { Wolf } from './classes/Wolf';
import { Egg } from './classes/Egg';

import WolfBoard from './WolfBoard.vue';
import Overlay from '@/components/UI/Overlay.vue';
import WolfControl from './WolfControl.vue';
import WolfHud from './WolfHud.vue';
import MyButton from '@/components/UI/MyButton.vue';

import type { IMove } from './interfaces/emits';
import type { IEggStartPositions } from './interfaces/egg';

const emit = defineEmits<{
  (e: 'newScore', score: number): void
}>();

const props = defineProps(
  { 
    bestScore: {
      type: Number,
      required: true,
    }
  }
);

let board: Board;
let wolf: Wolf;
let context: CanvasRenderingContext2D;

let eggs: Egg[] = [];
const maxEggsOnBoard: number = 4;
const eggRadius: number = 6;
let eggStartPositions: IEggStartPositions;
let addEgg: Function;

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
  
  eggStartPositions = {
    'topleft': {x: 0, y: lineDeviationTopY},
    'bottomleft': {x: 0, y: board.height - lineDeviationBottomY},
    'topright': {x: board.width, y: lineDeviationTopY},
    'bottomright': {x: board.width, y: board.height - lineDeviationBottomY},
  }
}

let gameIsOver = ref<boolean>(false);
let gameIsFirst = ref<boolean>(true);

let score = ref<number>(0);
let lives = ref<number>(0);
const livesCount: number = 5;
let speed: number = 300;

let gameLoopID: number;

function startGame() {
  if (gameIsFirst) gameIsFirst.value = false;

  gameIsOver.value = false;

  score.value = 0;
  lives.value = livesCount;

  eggs = [];
  addEgg = createEggAdder();

  gameLoopID = setInterval(gameLoop, speed);
}

function gameOver() {
  gameIsOver.value = true;
  clearInterval(gameLoopID);
}

watch(gameIsOver, (gameOver) => {
  if (gameOver) {
    if (score.value > props.bestScore) {
      emit('newScore', score.value);
    }
  }
});

function gameLoop() {
  board.clear();
  
  if (lives.value === 0) {
    gameOver();
  }

  if (eggs.length < maxEggsOnBoard) {
    addEgg(eggs);
  }

  eggs = deleteFallenEggs(eggs);
  moveAndCheckEggs(eggs, 10);

  wolf.draw(context);
}

function moveAndCheckEggs(eggs: Egg[], step: number) {
  eggs.forEach((egg) => {

    egg.move(lineAngle, step);
    egg.draw(context);

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
      lives.value -=1;
    }
  })
}

function deleteFallenEggs(eggs: Egg[]) {
  eggs = eggs.filter((egg) => {
    return !egg.isFallen
  })
  return eggs;
}

function drawEggs(eggs: Egg[]) {
  eggs.forEach(egg => {
    egg.draw(context);
  });
}

function createEggAdder() {
  let callCount: number = 0;

  return function(eggs: Egg[]) {
    callCount += 1;

    if (callCount % 3 === 0) {
      const keys = Object.keys(eggStartPositions);
      const randomKey = keys[Math.floor(Math.random() * keys.length)];

      const eggPosition = eggStartPositions[randomKey];

      const egg = new Egg(board, eggPosition.x, eggPosition.y - eggRadius, eggRadius);
      eggs.push(egg);
    }
  }
}

function moveWolf({side, basket}: IMove) {
  board.clear()
  // wolf.clear(context);

  wolf.state.side = side;
  wolf.state.basket = basket;
  
  drawEggs(eggs);
  wolf.draw(context);
}

onUnmounted(() => {
  clearInterval(gameLoopID);
});

</script>


<style scoped>

.wolf {
  position: relative;
}

.wolf-header {
  display: flex;
  justify-content: center;
  padding: 10px;
  border: 5px solid #cd06ff44;
  background-color: #3e065fe8;

}

.wolf-main {
  padding: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 20px;
  background-color: #3e065fe8;
  border-left: 5px solid #cd06ff44;
  border-right: 5px solid #cd06ff44;
  color: white;
}

.wolf-footer {
  border: 5px solid #cd06ff44;
  border-top: none;
  padding: 10px;
  background-color: #3e065fe8;
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