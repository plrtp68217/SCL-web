<template>

    <div class="tetris">

        <div class="tetris-header">
    
            <div class="tetris-header-left">
                <TetrisBoard 
                    @board="defineBoard"
                />
            </div>
            
            <div class="tetris-header-right">
                <TetrisNextShape/>
                <TetrisHud/>
            </div>
            
         </div>
    
        <div class="tetris-footer">
            <div class="tetris-footer-sound">SOUND</div>
            <TetrisControl
                @move="moveShape"
                @rotate="rotateShape"
            />
        </div>

    </div>

</template>


<script setup lang="ts">
import { ref, computed } from 'vue';
import TetrisBoard from './TetrisBoard.vue';
import TetrisNextShape from './TetrisNextShape.vue';
import TetrisHud from './TetrisHud.vue';
import TetrisControl from './TetrisControl.vue';
import { Board } from './classes/Board';
import { Shape } from './classes/Shape';
import { State } from './classes/State';
import type { IMove } from './interfaces/move';
import { getRandomShape } from './utils/random';
import { shapeList } from './assets/shapeList';

let board: Board;

function defineBoard(newBoard: Board) {
    board = newBoard;
}

let shapes: Shape[] = getRandomShape(shapeList);
const state: State = new State();

let nextShapes: Shape[] = getRandomShape(shapeList);

let speed: number = 200;
let gameLoopID: number;

gameLoopID = setInterval(gameLoop, speed);
// clearInterval(gameLoopID);

function gameLoop() {
    if (!shapes[state.value].isFalling) {
        board.draw(shapes[state.value]);
        state.reset()
        shapes = nextShapes;
        nextShapes = getRandomShape(shapeList);
    }

    board.clear(shapes[state.value]);

    moveShape({axis: 'y', direction: 1});

    board.draw(shapes[state.value]);
}


function moveShape(value: IMove) {
    const {axis, direction} = value;

    board.clear(shapes[state.value]);

    for (let shapeID in shapes) {
        if (axis === 'x') {
            if (board.isInWidthBounds(shapes[shapeID], direction)) {
                shapes[shapeID].move(axis, direction * board.step);
            }
        }
        else if (axis === 'y') {
            if (board.isCollision(shapes[state.value])) {
                shapes[state.value].stop();
                board.shapes.push(shapes[state.value]);
            }
            else {
                shapes[shapeID].move(axis, direction * board.step);
            }
        }
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