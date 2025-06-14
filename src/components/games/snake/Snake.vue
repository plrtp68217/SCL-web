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

        <Overlay v-if="gameIsFirst || gameIsOver">

            <div class="modal-container">
            
              <h1 class="modal-container__title">
                Snake
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

</template>


<script setup lang="ts">
import { ref, onUnmounted, watch } from 'vue';

import { Board } from './classes/Board';
import { Bonuse } from './classes/Bonuse';

import SnakeBoard from './SnakeBoard.vue';
import SnakeHud from './SnakeHud.vue';
import SnakeControl from './SnakeControl.vue';
import Overlay from '@/components/UI/Overlay.vue';
import MyButton from '@/components/UI/MyButton.vue';

import { isChance } from '../common/utils/random';
import type { IMove } from '../common/interfaces/emits';

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


function defineBoard(newBoard: Board): void {
    board = newBoard;

    // board.createSnake();
    // board.createApple();

    // if(isChance(0.5)) {
    //     board.createBonuse();
    // }
}

function changeDirection({axis, direction}: IMove): void {
    board.snake.direction = board.snake.axis === axis && board.snake.direction !== direction 
                            ? 
                            board.snake.direction 
                            : 
                            direction

    board.snake.axis = axis;
}

let gameIsOver = ref<boolean>(false);
let gameIsFirst = ref<boolean>(true);

let score = ref<number>(0);

let speed: number = 300;
let gameLoopID: number;


function startGame() {
    board.clear();

    if (gameIsFirst) gameIsFirst.value = false;

    gameIsOver.value = false;

    score.value = 0;

    gameLoopID = setInterval(gameLoop, speed);

    board.createSnake();
    board.createApple();

    if(isChance(0.5)) {
        board.createBonuse();
    }
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


function gameLoop(): void {
    board.clearEntitie(board.snake.blocks);

    board.snake.move();

    if (board.isCollision()) {
        gameOver()
    }

    if (board.isFeed(board.apple)) {
        score.value += board.apple.reward;
        board.snake.enlarge();
        board.createApple();
    }

    if (board.isFeed(board.bonuse)) {
        score.value += board.bonuse.reward;
        board.bonuse = {} as Bonuse;
    }

    if(!(board.bonuse instanceof Bonuse) && isChance(0.95)) {
        board.createBonuse();   
    }
    
    if (board.bonuse instanceof Bonuse) {
        board.drawBlock(board.bonuse);
    }

    board.drawBlock(board.apple);
    board.drawEntitie(board.snake.blocks);

}

onUnmounted(() => {
  clearInterval(gameLoopID)
});

</script>


<style scoped>

.snake {
    position: relative;
}

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
  