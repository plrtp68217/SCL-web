<template>

    <div class="tetris">
        <div class="tetris-label">TETRIS DEMO</div>

        <TetrisMain/>

    </div>

    
</template>


<script setup lang="ts">
import { onMounted } from 'vue';
import TetrisMain from "@/components/games/tetris/TetrisMain.vue";

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