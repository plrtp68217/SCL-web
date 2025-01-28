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
import { getRandomShape } from './assets/shapes';

let board: Board;

function defineBoard(newBoard: Board) {
    board = newBoard;
}

let shapes: Shape[] = getRandomShape();
const state = ref<number>(0);
const shape = computed<Shape>(() => shapes[state.value])

function moveShape(value: IMove) {
    const {axis, direction} = value;

    board.clear(shape.value);

    for (let shapeID in shapes) {
        if (board.isInBounds(shapes[shapeID], direction)) {
            shapes[shapeID].move(axis, direction * board.step)
        };
    }

    // if (board.isCollision(shape.value)) {
    //     board.draw(shape.value);
    //     shape.value.isFalling = false;
    // }

    board.draw(shape.value);
}

function rotateShape() {
    board.clear(shape.value);
    state.value  = (state.value + 1) % shapes.length;
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