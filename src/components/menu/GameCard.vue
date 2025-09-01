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
.game-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 150px;
    width: 110px;
    text-align: center;
    padding: 4px 4px;
    flex: 1 1 auto;
}


.game-card-label {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    margin-bottom: 5px;
    border-radius: 10%;
    color: white;
    font-family: "Roboto", serif;
    font-size: 17px;
    text-wrap: wrap;
}

.game-card-image {
    width: 100%;
    object-fit: cover;
    border-radius: 10%;
}
</style>