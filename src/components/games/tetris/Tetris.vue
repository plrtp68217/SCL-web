<template>

    <div class="tetris">

        <div class="tetris-header">

            <div class="tetris-header-left">
                <TetrisMainBoard @main_board="defineMainBoard" />
            </div>

            <div class="tetris-header-right">
                <TetrisSecondBoard @second_board="defineSecondBoard" />
                <TetrisHud :score="score" />
            </div>

        </div>

        <div class="tetris-footer">
            <!-- <div class="tetris-footer-sound">SOUND</div> -->
            <TetrisControl @move="moveShape" @rotate="rotateShape" />
        </div>

        <Overlay v-if="gameIsFirst || gameIsOver">

            <div class="modal-container">
            
              <h1 class="modal-container__title">
                Tetris
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

    <img id="blueblock_sprite" src="/images/tetris/blueblock_sprite.png" style="display: none;">
    <img id="greenblock_sprite" src="/images/tetris/greenblock_sprite.png" style="display: none;">
    <img id="orangeblock_sprite" src="/images/tetris/orangeblock_sprite.png" style="display: none;">
    <img id="purpleblock_sprite" src="/images/tetris/purpleblock_sprite.png" style="display: none;">
    <img id="redblock_sprite" src="/images/tetris/redblock_sprite.png" style="display: none;">
    <img id="whiteblock_sprite" src="/images/tetris/whiteblock_sprite.png" style="display: none;">
    <img id="yellowblock_sprite" src="/images/tetris/yellowblock_sprite.png" style="display: none;">

</template>


<script setup lang="ts">
import { onUnmounted, ref, watch } from 'vue';

import TetrisMainBoard from './TetrisMainBoard.vue';
import TetrisSecondBoard from './TetrisSecondBoard.vue';
import TetrisHud from './TetrisHud.vue';
import TetrisControl from './TetrisControl.vue';
import Overlay from '@/components/UI/Overlay.vue';
import MyButton from '@/components/UI/MyButton.vue';

import { Board } from './classes/Board';
import { Shape } from './classes/Shape';
import { State } from './classes/State';

import type { IMove } from '../common/interfaces/emits';

import { getRandomShapes } from './utils/random';
import { shapeList } from './assets/shapeList';
import { getShapesWithStartPosition } from './utils/position';

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
let shapes: Shape[];
let state: State;
let nextShapes: Shape[];


function defineMainBoard(newBoard: Board) {
    board = newBoard;
    // shapes = getRandomShapes(shapeList);
    // shapes = getShapesWithStartPosition(shapes, board);
    // state = new State();

    // nextShapes = getRandomShapes(shapeList);
}

let secondBoard: Board;

function defineSecondBoard(newBoard: Board) {
    secondBoard = newBoard;
    secondBoard.step = 20;
    // secondBoard.draw(nextShapes[0]);
}

let gameIsOver = ref<boolean>(false);
let gameIsFirst = ref<boolean>(true);

const reward = 100;
let score = ref<number>(0);
let speed: number = 200;

let gameLoopID: number;


function startGame() {
    if (gameIsFirst) gameIsFirst.value = false;

    gameIsOver.value = false;

    score.value = 0;

    shapes = getRandomShapes(shapeList);
    shapes = getShapesWithStartPosition(shapes, board);

    board.reset();
    secondBoard.reset();

    state = new State();

    nextShapes = getRandomShapes(shapeList);

    secondBoard.drawShape(nextShapes[0]);

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


function gameLoop(): void {
    if (!shapes[state.value].isFalling) {
        board.shapesOnBoard.push(shapes[state.value]);
        state.reset();
        
        const filledLinesCount = board.checkAndClearFilledLines();

        if (filledLinesCount) {
            score.value += reward * filledLinesCount;
        }

        shapes = [...nextShapes];
        shapes = getShapesWithStartPosition(shapes, board);

        board.drawShape(shapes[state.value]);

        if (board.isCollision(shapes[state.value], 'y', 1)) {
            gameOver();
        }
        
        secondBoard.clearShape(nextShapes[0]);
        nextShapes = getRandomShapes(shapeList);
        secondBoard.drawShape(nextShapes[0]);
    }
    else {
        moveShape({ axis: 'y', direction: 1 });
        moveShapesOnBoard();
    }
}

function moveShapesOnBoard(): void {
    const axis: 'x' | 'y' = 'y';
    const direction: -1 | 1 = 1;

    for (let shape of board.shapesOnBoard) {
        if (!board.isCollision(shape, axis, direction)) {
            board.clearShape(shape);
            shape.move(axis, direction * board.step);
            board.drawShape(shape);
        }
    }
}

function moveShape({axis, direction}: IMove): void {
    if (shapes[state.value].isFalling) {
        
        board.clearShape(shapes[state.value]);
    
        switch (axis) {
            case 'x':
                for (let shape in shapes) {
                    if (!board.isCollision(shapes[shape], axis, direction)) {
                        shapes[shape].move(axis, direction * board.step);
                    }
                }
                break;
    
            case 'y':
                if (board.isCollision(shapes[state.value], axis, direction)) {
                    shapes[state.value].stop();
                }
                else {
                    for (let shape in shapes) {
                            shapes[shape].move(axis, direction * board.step);
                    }
                }
                break;
        }
        board.drawShape(shapes[state.value]);
    }
}

function rotateShape(): void {
    const nextStateValue = (state.value + 1) % shapes.length;
    const nextState = shapes[nextStateValue];

    if (!board.isRotationCollision(nextState)) {
        board.clearShape(shapes[state.value]);
        state.increment(shapes);
        board.drawShape(shapes[state.value]);
    }
}

onUnmounted(() => {
    clearInterval(gameLoopID)
})

</script>


<style scoped>

.tetris {
    position: relative;
}

.tetris-header {
    display: flex;
    justify-content: center;
    gap: 5px;
    background-color: rgb(194, 132, 252);
    padding: 10px;
    border: 5px solid #3d3c3c;
}

.tetris-header-right {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.tetris-footer {
    width: 100%;
    padding: 10px;
    background-color: #cc74ff;
    display: flex;
    border-right: 5px solid #3d3c3c;
    border-bottom: 5px solid #3d3c3c;
    border-left: 5px solid #3d3c3c;
}

.tetris-footer-sound {
    width: 30%;
    text-align: center;
    margin: auto;
    color: white;
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