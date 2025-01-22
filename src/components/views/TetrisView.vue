<template>

    <div class="tetris">
        <div class="tetris-label">TETRIS</div>

        <Tetris/>

    </div>

    
</template>


<script setup lang="ts">
import { onMounted } from 'vue';
import Tetris from "@/components/games/tetris/Tetris.vue";

onMounted(() => {

})

</script>

<style scoped>

.tetris {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

</style>