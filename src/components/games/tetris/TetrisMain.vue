<template>

    <div class="tetris">

        <div class="tetris-header">

            <div class="tetris-header-left">
                <TetrisBoard @main_board="defineMainBoard" />
            </div>

            <div class="tetris-header-right">
                <TetrisNextShape @second_board="defineSecondBoard" />
                <TetrisHud />
            </div>

        </div>

        <div class="tetris-footer">
            <div class="tetris-footer-sound">SOUND</div>
            <TetrisControl @move="moveShape" @rotate="rotateShape" />
        </div>

    </div>

</template>


<script setup lang="ts">
import TetrisBoard from './TetrisBoard.vue';
import TetrisNextShape from './TetrisNextShape.vue';
import TetrisHud from './TetrisHud.vue';
import TetrisControl from './TetrisControl.vue';
import { Board } from './classes/Board';
import { Shape } from './classes/Shape';
import { State } from './classes/State';
import type { IMove } from './interfaces/move';
import { getRandomShapes } from './utils/random';
import { shapeList } from './assets/shapeList';

let board: Board;

function defineMainBoard(newBoard: Board) {
    board = newBoard;
}

let secondBoard: Board;

function defineSecondBoard(newBoard: Board) {
    secondBoard = newBoard;
    secondBoard.step = 40;
    secondBoard.draw(nextShapes[0])
}

let speed: number = 200;
let gameLoopID: number;

let shapes: Shape[] = getRandomShapes(shapeList);
const state: State = new State();

let nextShapes: Shape[] = getRandomShapes(shapeList);

gameLoopID = setInterval(gameLoop, speed);
// clearInterval(gameLoopID);

function gameLoop() {
    if (!shapes[state.value].isFalling) {

        board.shapesOnBoard.push(shapes[state.value]);
        
        state.reset()

        shapes = [...nextShapes];

        secondBoard.clear(nextShapes[0]);
        nextShapes = getRandomShapes(shapeList);
        secondBoard.draw(nextShapes[0]);

    }
    else {
        board.clear(shapes[state.value]);
        moveShape({ axis: 'y', direction: 1 });
        board.draw(shapes[state.value]);
    }

}

function moveShape(value: IMove) {
    const { axis, direction } = value;

    board.clear(shapes[state.value]);

    switch (axis) {
        case 'x':
            for (let shape in shapes) {
                if (board.isInWidthBounds(shapes[shape], direction)) {
                    shapes[shape].move(axis, direction * board.step);
                }
            }
            break;

        case 'y':
            if (board.isCollision(shapes[state.value])) {
                shapes[state.value].stop();
            }
            else {
                for (let shape in shapes) {
                        shapes[shape].move(axis, direction * board.step);
                }
            }
            break;
    }

    board.draw(shapes[state.value]);
}

function rotateShape() {
    board.clear(shapes[state.value]);
    state.increment(shapes)
    board.draw(shapes[state.value]);
}

</script>


<style scoped>
.tetris {
    width: 340px;
}

.tetris-header {
    display: flex;
    justify-content: space-around;
    background-color: rgb(194, 132, 252);
    width: 100%;
    padding: 10px;
    border: 5px solid #3d3c3c;
}

.tetris-header-right {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.tetris-footer {
    width: 100%;
    background-color: #cc74ff;
    display: flex;
    height: 80px;
    border-right: 5px solid #3d3c3c;
    border-bottom: 5px solid #3d3c3c;
    border-left: 5px solid #3d3c3c;
}

.tetris-footer-sound {
    width: 30%;
    text-align: center;
    margin: auto;
}
</style>