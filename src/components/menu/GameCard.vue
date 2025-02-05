<template>
    <div class="game-card" @click="console.log('запускаемся')">
        <div class="game-card-label">
            <p>{{label}}</p>
        </div>
        <img class="game-card-image" :src="image" />
    </div>
</template>


<script setup lang="ts">
import type { GameCard } from './interfaces/props';

const { label, image } = defineProps<GameCard>();

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