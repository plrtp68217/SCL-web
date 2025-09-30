<template>

    <div class="tetris">

        <PauseButton class="pause-button" @click="pauseGame">PAUSE</PauseButton>

        <div class="tetris-header">

            <div class="tetris-header-left">
                <TetrisMainBoard @main_board="defineMainBoard" />
            </div>

            <div class="tetris-header-right">
                <TetrisSecondBoard @second_board="defineSecondBoard" />
                <TetrisHud :score="score" />
                <MyButton @click="console.log(board.shapesOnBoard)">show-shapes</MyButton>
            </div>

        </div>

        <div class="tetris-footer">
            <TetrisControl @move="moveShape" @rotate="rotateShape" />
        </div>

        <Overlay v-if="gameIsFirst || gameIsOver">
            <GameMenu
              v-model:level="currentLevel"
              :title="'TETRIS'"
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
import GameMenu from '@/components/game-layout/GameMenu.vue';
import GamePause from '@/components/game-layout/GamePause.vue';
import PauseButton from '@/components/UI/PauseButton.vue';

import { setPause, unsetPause } from '../common/utils/pause';

import { Board } from './classes/Board';
import { Shape } from './classes/Shape';
import { State } from './classes/State';
import { Block } from './classes/Block';

import type { IMove } from '../common/interfaces/emits';

import { getRandomShapes } from './utils/random';
import { shapeList } from './assets/shapeList';
import { getShapesWithStartPosition } from './utils/position';
import MyButton from '@/components/UI/MyButton.vue';

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
let shapes: Shape[];
let state: State;
let nextShapes: Shape[];


function defineMainBoard(newBoard: Board) {
    board = newBoard;
}

let secondBoard: Board;

function defineSecondBoard(newBoard: Board) {
    secondBoard = newBoard;
    secondBoard.step = 20;
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

    gameLoopID = setInterval(gameLoop, speed / difficultyLevels[currentLevel.value]);

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
  if (gameOver) {
    if (score.value > props.bestScore) {
      emit('newScore', score.value);
    }
  }
});


function gameLoop(): void {
    if (!shapes[state.value].isFalling) {
        emit('playSound', 'tetris-shape-falled', 0.1);
        board.shapesOnBoard.push(shapes[state.value]);
        state.reset();
        
        const filledLinesY = board.checkAndClearFilledLines();

        if (filledLinesY.length !== 0) {
            emit('playSound', 'tetris-filled-line', 0.1)
            score.value += reward * filledLinesY.length * difficultyLevels[currentLevel.value];

            board.clear();

            moveLines(filledLinesY);

            board.drawShapesOnBoard();
        }

        shapes = [...nextShapes];
        shapes = getShapesWithStartPosition(shapes, board);

        board.drawShape(shapes[state.value]);

        if (board.isCollision(shapes[state.value], 'y', 1)) {
            emit('playSound', 'game-over', 0.01);
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

function moveLines(filledLinesY: number[]) {
    let blocksOnBoard: Block[] = [];

    for (let shape of board.shapesOnBoard) {
        blocksOnBoard.push(...shape.blocks);
    }

    

    for (let lineY of filledLinesY ) {
        for (let block of blocksOnBoard) {
            if (block.y < lineY) {
                block.y += board.step;
            }
        }
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
    clearInterval(gameLoopID);
    emit('checkScore', score.value);
})

</script>


<style scoped>

.tetris {
    position: relative;
    display: flex;
    flex-direction: column;
}

.tetris-header {
    display: flex;
    justify-content: center;
    gap: 5px;
    background-color: #3e065fe8;
    padding: 10px;
    border: 5px solid #cd06ff44;
}

.pause-button {
  align-self: flex-end;
  margin-right: 5px;
  margin-top: 5px;
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
    background-color: #3e065fe8;
    display: flex;
    border-right: 5px solid #cd06ff44;
    border-bottom: 5px solid #cd06ff44;
    border-left: 5px solid #cd06ff44;
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