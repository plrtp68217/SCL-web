<template>
    <div class="game-card" @click="$router.push(game.path)">
        <div class="game-card-label">
            <p>{{game.label}}</p>
        </div>
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
    border-radius: 10%;
    box-shadow: 0px 0px 42px 0px rgba(238, 16, 222, 0.27);
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
}
</style>