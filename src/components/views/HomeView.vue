<template>

    <div class="menu">
        <img class="menu-image-castle" src="/images/castle-menu.jpg" alt="Мультипликационный замок на горе ">

        <!-- Верхняя часть: Earn и Лучшие игроки -->
        <header class="menu-header">

            <!-- Задачи для игроков -->
            <div class="earn-section">
                <h2>Earn</h2>
                <img class="earn-section-image" src="/images/earn.png">
            </div>

            <!-- Список лучших игроков -->
            <div class="leaderboard-section">
                <h2 class="leaderboard-section-label">The best of the best</h2>
                <img class="leaderboard-section-image" src="/images/best-players.png">
            </div>

        </header>

        <!-- Средняя часть: Баланс игрока -->
        <section class="balance-section">

            <div class="balance-container">
                <h2 class="balance-label">Your balance: </h2>
                <h2 class="balance-count">1000</h2>
                <img class="balance-coin" src="/images/coin.png">
            </div>

        </section>

        <!-- Нижняя часть: Карточки игр -->
        <section class="games-section">

            <div v-for="game in games">
                <GameCard :label="game.label" :image="game.image"/>
            </div>
            
        </section>
    </div>

</template>


<script setup lang="ts">
import { onMounted } from 'vue';
import GameCard from '../home/GameCard.vue';

type Game = {
  label: string;
  image: string;
};

type Games = {
  snake: Game;
  tetris: Game;
  wolf: Game;
};

const games: Games = {
    snake: {
        label: 'Snake',
        image: '/images/snake.png'
    },
    tetris: {
        label: 'Tetris',
        image: '/images/tetris.png'
    },
    wolf: {
        label: 'Wolf Cathes Eggs',
        image: '/images/wolf.png'
    },
}

onMounted(() => {

})

</script>


<style scoped>
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
    height: 10%;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    backdrop-filter: blur(4px);
    border-bottom: 1px solid rgba(250, 250, 9, 0.3);
    box-shadow: 12px 19px 16px 2px rgba(238, 232, 16, 0.27);
}

.leaderboard-section-label {
    width: 150px;
    text-align: center;
}

.earn-section {
    display: flex;
    align-items: center;
    gap: 5px;
    color: yellow;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.earn-section-image {
    width: 30px;
    height: 30px;
}

.leaderboard-section {
    display: flex;
    align-items: center;
    color: yellow;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

}

.leaderboard-section-image {
    width: 30px;
    height: 30px;
}

/* Средняя часть: Баланс игрока */
.balance-section {
    height: 70%;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
}

.balance-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    color: yellow;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.balance-coin {
    width: 30px;
    height: 30px;
}

/* Нижняя часть: Карточки игр */
.games-section {
    height: 20%;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    backdrop-filter: blur(4px);
    border-top: 1px solid rgba(250, 250, 9, 0.3);
    box-shadow: 12px -11px 16px 2px rgba(238, 232, 16, 0.27);
}
</style>