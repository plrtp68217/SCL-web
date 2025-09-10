<template>
    <canvas id="second-board" width="80" height="80"></canvas>
</template>


<script setup lang="ts">
import { onMounted } from 'vue';
import { Board } from './classes/Board';
import type { SecondBoardEmit } from './interfaces/emits'

let board: Board;

const emit = defineEmits<SecondBoardEmit>();

onMounted(() => {
    const canvas = document.querySelector('#second-board') as HTMLCanvasElement;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;

    const width: number = canvas.width;
    const height: number = canvas.height;

    const blueBlockSprite = document.getElementById('blueblock_sprite') as HTMLImageElement;
    const greenBlockSprite = document.getElementById('greenblock_sprite') as HTMLImageElement;
    const orangeBlockSprite = document.getElementById('orangeblock_sprite') as HTMLImageElement;
    const purpleBlockSprite = document.getElementById('purpleblock_sprite') as HTMLImageElement;
    const redBlockSprite = document.getElementById('redblock_sprite') as HTMLImageElement;
    const whiteBlockSprite = document.getElementById('whiteblock_sprite') as HTMLImageElement;
    const yellowBlockSprite = document.getElementById('yellowblock_sprite') as HTMLImageElement;

    board = new Board(
        context, 
        width, 
        height,

        blueBlockSprite,
        greenBlockSprite,
        orangeBlockSprite,
        purpleBlockSprite,
        redBlockSprite,
        whiteBlockSprite,
        yellowBlockSprite,

    );
    
    emit('second_board', board);
})

</script>


<style scoped>

#second-board {
    width: 80px;
    height: 80px;
    border: 1px solid rgba(128, 2, 86, 0.507);
    background-color: #3d3c3c;
    background-image: url('/images/tetris/tetris_secondbackground.png');
}

</style>