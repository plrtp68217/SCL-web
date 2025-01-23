<template>

    <div class="tetris-header">

        <div class="tetris-header-left">
            <TetrisBoard/>
        </div>
        
        <div class="tetris-header-right">
            <TetrisNextElement/>
            <TetrisHud/>
        </div>
        
     </div>

    <div class="tetris-footer">
        <div class="tetris-sound">SOUND</div>
        <TetrisControl/>
    </div>

</template>


<script setup lang="ts">

import TetrisBoard from './TetrisBoard.vue';
import TetrisNextElement from './TetrisNextElement.vue';
import TetrisHud from './TetrisHud.vue';
import TetrisControl from './TetrisControl.vue';

</script>


<style scoped>

.tetris-header {
    display: flex;
    justify-content: space-around;
    background-color: rgb(194, 132, 252);
    width: 360px;
    padding: 10px;
    border: 5px solid #3d3c3c;
}

.tetris-header-right {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.tetris-footer {
    width: 360px;
    background-color: #cc74ff;
    display: flex;
    height: 80px;
    border-right: 5px solid #3d3c3c;
    border-bottom: 5px solid #3d3c3c;
    border-left: 5px solid #3d3c3c;
}

.tetris-sound {
    width: 30%;
    text-align: center;
    margin: auto;
}




</style>