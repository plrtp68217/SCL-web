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
import type { IMove } from './interfaces/move';
import { getRandomShape } from './utils/random';
import { shapeList } from './assets/shapeList';

let board: Board;

function defineBoard(newBoard: Board) {
    board = newBoard;
}

const shapes = ref<Shape[]>(getRandomShape(shapeList));
const state = ref<number>(0);
const shape = computed<Shape>(() => shapes.value[state.value])

let nextShapes: Shape[] = getRandomShape(shapeList);

let speed: number = 200;
let gameLoopID: number;

gameLoopID = setInterval(gameLoop, speed);
// clearInterval(gameLoopID);

function gameLoop() {

    if (!shape.value.isFalling) {
        board.draw(shape.value);
        state.value = 0;
        shapes.value = nextShapes;
        nextShapes = getRandomShape(shapeList);
    }

    board.clear(shape.value);

    moveShape({axis: 'y', direction: 1});

    board.draw(shape.value);
}


function moveShape(value: IMove) {
    const {axis, direction} = value;

    board.clear(shape.value);

    for (let shapeID in shapes.value) {
        if (axis === 'x') {
            if (board.isInWithBounds(shapes.value[shapeID], direction)) {
                shapes.value[shapeID].move(axis, direction * board.step);
            }
        }
        else if (axis === 'y') {
            if (board.isCollision(shape.value)) {
                shape.value.stop();
                board.shapes.push(shape.value);
            }
            else {
                shapes.value[shapeID].move(axis, direction * board.step);
            }
            
        }
    }

    board.draw(shape.value);
}

function rotateShape() {
    board.clear(shape.value);
    state.value  = (state.value + 1) % shapes.value.length;
    board.draw(shape.value);
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