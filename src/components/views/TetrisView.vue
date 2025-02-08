<template>
    
    <Background/>

    <div class="header">

    </div>

    <div class="main">
        <Tetris/>
    </div>

    <div class="footer">

    </div>

</template>


<script setup lang="ts">
import { onMounted } from 'vue';
import Tetris from "@/components/games/tetris/Tetris.vue";
import Background from '../background/Background.vue';

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