<template>

    <div class="menu">
        <img class="menu-image-castle" src="@/images/castle-menu.jpg" alt="Мультипликационный замок на горе ">

        <!-- Верхняя часть: Earn и Лучшие игроки -->
        <header class="menu-header">

            <!-- Задачи для игроков -->
            <div class="earn-section">
                <h2>Earn</h2>
                <!-- <img class="earn-image" src="@/images/earn.png"> -->
            </div>

            <!-- Список лучших игроков -->
            <div class="leaderboard-section">
                <h2>The best of the best</h2>
            </div>

        </header>

        <!-- Средняя часть: Баланс игрока -->
        <section class="balance-section">

            <div class="balance-container">
                <h2 class="balance-label">Your balance: </h2>
                <h2 class="balance-count">1000</h2>
                <img class="balance-coin" src="@/images/coin.png">
            </div>

        </section>

        <!-- Нижняя часть: Карточки игр -->
        <section class="games-section">
            <div v-for="game in games">
                <GameCard :label="game.label" :image="game.image"/>
                <image src="../../images/snake.png"/>
            </div>
            

        </section>
    </div>

</template>


<script setup lang="ts">
import { onMounted } from 'vue';
import GameCard from '../home/GameCard.vue';

const games = {
    snake: {
        label: 'Snake',
        image: '../images/snake.png'
    },
    tetris: {
        label: 'Tetris',
        image: '../images/snake.png'
    },
    wolf: {
        label: 'Wolf Cathes Eggs',
        image: '../images/snake.png'
    },
}

onMounted(() => {

})

</script>


<style scoped>

/* bg-color rgb(249, 217, 176) */
/* rgb(36, 167, 196) */

.menu {
    height: 100vh;
}

/* Изображение на заднем фоне */
.menu-image-castle {
    width: 100%;
    height: 100vh;
    object-fit: cover;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
}

/* Верхняя часть: Earn и Лучшие игроки */
.menu-header {
    height: 20%;
    padding: 10px;
    display: flex;
    justify-content: space-between;
}

.earn-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: yellow;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.earn-image {
    width: 70px;
    height: 70px;
    /* transition: active 200ms linear; */
}

/* .earn-image:active {
    transform: scale(1.2);
} */

.leaderboard-section {
    color: yellow;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

/* Средняя часть: Баланс игрока */
.balance-section {
    height: 50%;
    padding: 10px;
    display: flex;
}

.balance-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    margin: auto;
}

.balance-coin {
    width: 30px;
    height: 30px;
}

/* Нижняя часть: Карточки игр */
.games-section {
    height: 30%;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-around;
}

</style>