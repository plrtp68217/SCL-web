<template>
    <div class="snake">

        <PauseButton class="pause-button" @click="pauseGame">PAUSE</PauseButton>

        <div class="snake-header">
            <SnakeBoard @board="defineBoard" />
        </div>

        <div class="snake-footer">

            <div class="snake-footer-hud">
                <SnakeHud :score="score"/>
            </div>

            <div class="snake-footer-control">
                <SnakeControl @move="changeDirection"/>
            </div>

        </div>

        <Overlay v-if="gameIsFirst || gameIsOver">
          <GameMenu
            v-model:level="currentLevel"
            :title="'SNAKE'"
            :gameIsOver="gameIsOver"
            :score="score"
            :bestScore="bestScore"
            @start-game="startGame"
          />
        </Overlay>

        <Overlay v-if="gameOnPause">
          <GamePause
            @resume-game="resumeGame"
            :score="score"
          />
        </Overlay>

    </div>

    <img id="apple_spritesheet" src="/images/snake/apple_spritesheet.png" style="display: none;">
    <img id="snakebody_spritesheet" src="/images/snake/snakebody_spritesheet.png" style="display: none;">

    <img id="snakeheadtop_spritesheet" src="/images/snake/snakeheadtop_spritesheet.png" style="display: none;">
    <img id="snakeheadbottom_spritesheet" src="/images/snake/snakeheadbottom_spritesheet.png" style="display: none;">
    <img id="snakeheadleft_spritesheet" src="/images/snake/snakeheadleft_spritesheet.png" style="display: none;">
    <img id="snakeheadright_spritesheet" src="/images/snake/snakeheadright_spritesheet.png" style="display: none;">

</template>


<script setup lang="ts">
import { ref, onUnmounted, watch } from 'vue';

import { Board } from './classes/Board';
import { Bonuse } from './classes/Bonuse';

import SnakeBoard from './SnakeBoard.vue';
import SnakeHud from './SnakeHud.vue';
import SnakeControl from './SnakeControl.vue';
import Overlay from '@/components/UI/Overlay.vue';
import GameMenu from '@/components/game-layout/GameMenu.vue';
import GamePause from '@/components/game-layout/GamePause.vue';
import PauseButton from '@/components/UI/PauseButton.vue';

import { setPause, unsetPause } from '../common/utils/pause';

// import { isChance } from '../common/utils/random';
import type { IMove } from '../common/interfaces/emits';

const emit = defineEmits<{
  (e: 'newScore', score: number): void
  (e: 'playSound', soundName: string, volume?: number): void
  (e: 'checkScore', score: number): void
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


function defineBoard(newBoard: Board): void {
    board = newBoard;
}

function changeDirection({axis, direction}: IMove): void {
    if (board.snake.isNextHeadInBody(axis, direction) === false) {
      board.snake.direction = direction;
      board.snake.axis = axis;
    }
}

let gameIsOver = ref<boolean>(false);
let gameIsFirst = ref<boolean>(true);
let gameOnPause = ref<boolean>(false);

let currentLevel = ref<'easy' | 'medium' | 'hard'>('easy');
const difficultyLevels = {
  'easy': 1,
  'medium': 1.5,
  'hard': 2,
};
let score = ref<number>(0);
let speed: number = 300;
let gameLoopID: number;


function startGame() {
    board.clear();

    if (gameIsFirst) gameIsFirst.value = false;

    gameIsOver.value = false;

    score.value = 0;

    gameLoopID = setInterval(gameLoop, speed / difficultyLevels[currentLevel.value]);

    board.createSnake();
    board.createApple();

    // if(isChance(0.5)) {
    //     board.createBonuse();
    // }
}

function pauseGame() {
  gameOnPause.value = true;

  setPause(gameLoopID);
}

function resumeGame() {
  gameOnPause.value = false;

  gameLoopID = unsetPause(gameLoop, speed / difficultyLevels[currentLevel.value]);
}

function gameOver() {
    gameIsOver.value = true;
    clearInterval(gameLoopID);
}

watch(gameIsOver, (gameOver) => {
  if (gameOver && score.value > props.bestScore) {
      emit('newScore', score.value);
  }
});

function gameLoop(): void {
    board.clearEntitie(board.snake.blocks);

    board.snake.moveHead();
    emit('playSound', 'snake-move', 0.1);

    if (board.isCollision()) {
        emit('playSound', 'game-over', 0.01);
        gameOver()
    }

    if (board.isFeed(board.apple)) {
        emit('playSound', 'snake-pickup-apple', 0.1);
        score.value += board.apple.reward * difficultyLevels[currentLevel.value];
        board.createApple();
    }
    else {
        board.snake.dropTail();
    }

    if (board.isFeed(board.bonuse)) {
        score.value += board.bonuse.reward * difficultyLevels[currentLevel.value];
        board.bonuse = {} as Bonuse;
    }

    // if(!(board.bonuse instanceof Bonuse) && isChance(0.95)) {
    //     board.createBonuse();   
    // }
    
    if (board.bonuse instanceof Bonuse) {
        board.drawBlock(board.bonuse);
    }

    board.drawApple(board.apple);

    if (board.snake.blocks.length == 1) {
      board.drawSnakeHead(
        board.snake.blocks[0], 
        {axis: board.snake.axis, direction: board.snake.direction}
      );
    }
    else {
      board.drawSnakeHead(
        board.snake.blocks[0], 
        {axis: board.snake.axis, direction: board.snake.direction}
      );
      board.drawSnakeBody(board.snake.blocks.slice(1));
    }
}

onUnmounted(() => {
  clearInterval(gameLoopID)
  emit('checkScore', score.value);
});

</script>


<style scoped>

.snake {
  position: relative;
  display: flex;
  flex-direction: column;
}

.snake-header {
  display: flex;
  justify-content: center;
  padding: 10px;
  border: 5px solid #cd06ff44;
  background-color: #3e065fe8;
}

.pause-button {
  align-self: flex-end;
  margin-right: 5px;
  margin-top: 5px;
}

.snake-footer {
    display: flex;
    flex-direction: column;
    padding: 10px;
    font-size: 17px;
    color: white;
    background-color: #3e065fe8;
    border-right: 5px solid #cd06ff44;;
    border-bottom: 5px solid #cd06ff44;;
    border-left: 5px solid #cd06ff44;;
}

.snake-footer-sound {
    display: flex;
    align-items: center;
    font-size: 20px;
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
  