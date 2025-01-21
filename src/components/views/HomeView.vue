<template>

    <div class="menu">
        <img class="menu-image-castle" src="@/images/castle-menu.jpg" alt="Мультипликационный замок на горе ">

        <!-- Верхняя часть: Earn и Лучшие игроки -->
        <header class="menu-header">

            <!-- Задачи для игроков -->
            <div class="earn-section">
                <h2>Earn</h2>
            </div>

            <!-- Список лучших игроков -->
            <div class="leaderboard-section">
                <h2>The best of the best</h2>
            </div>

        </header>

        <!-- Средняя часть: Баланс игрока -->
        <section class="balance-section">

            <h2>Your balance: </h2>
            <h3>1000</h3>

        </section>

        <!-- Нижняя часть: Карточки игр -->
        <section class="games-section">

            <div class="game-card">
                <h3>Snake Game</h3>
                <button>Play</button>
            </div>

            <div class="game-card">
                <h3>Tetris</h3>
                <button>Play</button>
            </div>

            <div class="game-card">
                <h3>Wolf Cathes Eggs</h3>
                <button>Play</button>
            </div>

        </section>
    </div>

</template>


<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {

})

</script>


<style scoped>

/* bg-color rgb(249, 217, 176) */

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
    margin: 10px;
    display: flex;
    justify-content: space-between;
}

/* Средняя часть: Баланс игрока */
.balance-section {
    height: 50%;
    margin: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
}

/* Нижняя часть: Карточки игр */
.games-section {
    height: 30%;
    margin: 10px;
    display: flex;
    align-items: center;
    justify-content: space-around;

}

</style>