<template>

    <div class="menu">
        <img class="menu-image-castle" src="@/images/castle-menu.jpg" alt="Мультипликационный замок на горе ">

        <!-- Верхняя часть: Earn и Лучшие игроки -->
        <header class="menu-header">

            <div class="earn-section">
                <h2>Earn</h2>
                <!-- Задачи для игроков -->
            </div>

            <div class="leaderboard-section">
                <h2>Лучшие игроки недели</h2>
                <!-- Список лучших игроков -->
            </div>

        </header>

        <!-- Средняя часть: Баланс игрока -->
        <section class="balance-section">

            <h2>Ваш баланс</h2>
            <p>1000 монет</p>

        </section>

        <!-- Нижняя часть: Карточки игр -->
        <section class="games-section">

            <div class="game-card">
                <h3>Змейка</h3>
                <button>Играть</button>
            </div>

            <div class="game-card">
                <h3>Тетрис</h3>
                <button>Играть</button>
            </div>

            <div class="game-card">
                <h3>Волк ловит яйца</h3>
                <button>Играть</button>
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