<template>

    <div class="tetris">

        <div class="tetris-header">
    
            <div class="tetris-header-left">
                <TetrisBoard/>
            </div>
            
            <div class="tetris-header-right">
                <TetrisNextShape/>
                <TetrisHud/>
            </div>
            
         </div>
    
        <div class="tetris-footer">
            <div class="tetris-footer-sound">SOUND</div>
            <TetrisControl/>
        </div>

    </div>


</template>


<script setup lang="ts">

import TetrisBoard from './TetrisBoard.vue';
import TetrisNextShape from './TetrisNextShape.vue';
import TetrisHud from './TetrisHud.vue';
import TetrisControl from './TetrisControl.vue';

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