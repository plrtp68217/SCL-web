<template>

    <Background/>

    <div class="header">
        <GameHeader/>
    </div>

    <div class="main">
        <Tetris/>
    </div>

    <div class="footer">
        <GameFooter/>
    </div>

</template>


<script setup lang="ts">
import { onMounted } from 'vue';
import Tetris from "@/components/games/tetris/Tetris.vue";
import Background from '../background/Background.vue';
import GameHeader from '../game-layout/GameHeader.vue';
import GameFooter from '../game-layout/GameFooter.vue';

onMounted(() => {

})

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