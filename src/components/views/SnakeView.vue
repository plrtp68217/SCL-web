<template>

    <Background/>
    
    <div class="header">
        <GameHeader/>
    </div>


    <div class="main">
        <Snake/>
    </div>

    <div class="footer">
        <GameFooter/>
    </div>

</template>


<script setup lang="ts">
import Background from '../background/Background.vue';
import Snake from '../games/snake/Snake.vue';
import GameHeader from '../game-layout/GameHeader.vue';
import GameFooter from '../game-layout/GameFooter.vue';

</script>


<style scoped>

.main {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

</style>
  