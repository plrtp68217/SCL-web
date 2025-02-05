<template>

    <div class="menu">
         <Background/>

        <!-- Верхняя часть: Earn и Лучшие игроки -->
        <header class="menu-header">

            <!-- Задачи для игроков -->
            <div class="earn-section">
                <h2 class="earn-section-label">Earn</h2>
                <img class="earn-section-image" src="/images/menu/earn.png">
            </div>

            <!-- Список лучших игроков -->
            <div class="leaderboard-section">
                <h2 class="leaderboard-section-label">The best of the best</h2>
                <img class="leaderboard-section-image" src="/images/menu/best-players.png">
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
import GameCard from '../main-menu/GameCard.vue';
import Background from '../background/Background.vue';

interface Game {
  label: string;
  image: string;
};

interface Games {
  snake: Game;
  tetris: Game;
  wolf: Game;
};

const games: Games = {
    snake: {
        label: 'Snake',
        image: '/images/menu/snake.png'
    },
    tetris: {
        label: 'Tetris',
        image: '/images/menu/tetris.png'
    },
    wolf: {
        label: 'Wolf Cathes Eggs',
        image: '/images/menu/wolf.png'
    },
}

onMounted(() => {

})

</script>


<style scoped>

.menu {
    height: 100vh;
    font-family: "Jersey 15", serif;
}

/* Верхняя часть: Earn и Лучшие игроки */
.menu-header {
    height: 10%;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    backdrop-filter: blur(1px);
    border-bottom: 1px solid rgba(250, 9, 198, 0.3);
    box-shadow: 12px 19px 16px 2px rgba(250, 9, 198, 0.27);
    font-family: "Roboto", serif;
}

.leaderboard-section-label {
    width: 150px;
    text-align: center;
}

.earn-section {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 20px;
    color: rgb(51, 209, 72);
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.earn-section-image {
    margin-top: 8px;
    width: 30px;
    height: 30px;
}

.leaderboard-section {
    display: flex;
    align-items: center;
    color: rgb(217, 255, 0);
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

}

.leaderboard-section-image {
    width: 30px;
    height: 30px;
}

/* Средняя часть: Баланс игрока */
.balance-section {
    height: 68%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.balance-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    font-weight: 400;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    letter-spacing: 1px;
}

.balance-label {
    color: rgb(255, 100, 255);
}

.balance-count {
    color: yellow;
}

.balance-coin {
    width: 30px;
    height: 30px;
}

/* Нижняя часть: Карточки игр */
.games-section {
    height: 22%;
    padding: 5px 10px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    backdrop-filter: blur(1px);
    border-top: 1px solid rgba(250, 9, 198, 0.3);
    box-shadow: 12px -11px 16px 2px rgba(250, 9, 198, 0.27);
}
</style>