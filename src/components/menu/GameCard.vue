<template>
    <div class="game-card" @click="$router.push(game.path)">
        <img class="game-card-image" :src="game.image" />
    </div>
</template>


<script setup lang="ts">
import type { Game } from './interfaces/game';

const { game } = defineProps<{game: Game}>();

</script>


<style scoped>

@import url('/src/animations/gentlePulse.css');

.game-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 150px;
    max-width: 150px;
    text-align: center;
    flex: 1 1 auto;
    animation: gentlePulse 5s ease-in-out infinite;
}

.game-card-image {
    width: 100%;
    object-fit: cover;
}
</style>