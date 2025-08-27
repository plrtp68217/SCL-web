<template>
    
    <div class="menu">
        <Background/>

        <!-- Верхняя часть: Earn и Лучшие игроки -->
        <header class="menu-header">

            <!-- Задачи для игроков -->
            <div class="earn-section">
                <h2 class="earn-section-label">Earn</h2>
                <img class="earn-section-image" src="/images/menu/earn.svg">
            </div>

            <!-- Список лучших игроков -->
            <div class="leaderboard-section">
                <h2 class="leaderboard-section-label">The best of the best</h2>
                <img class="leaderboard-section-image" src="/images/menu/best-players.svg">
            </div>

        </header>

        <!-- Средняя часть: Баланс игрока && Логотип -->
        <section class="balance-logo">

            <div class="balance-container">
                <h2 class="balance-label">Your balance: </h2>
                <h2 class="balance-count">{{ user.getBalance }}</h2>
                <img class="balance-coin" src="/images/coin.png">
            </div>

            <div class="logo-container">

                <div class="circle">
                    <img class="circle_img" src="/images/menu/circle.svg">
                </div>

                <div class="ballerina_star">
                    <img class="star_img" src="/images/menu/star.svg">
                    <img class="ballerina_img" src="/images/menu/ballerina.svg">
                </div>

            </div>

        </section>

        <!-- Нижняя часть: Карточки игр -->
        <footer class="games">
            <SwiperGames :games="games"/>
        </footer>
        
    </div>

</template>


<script setup lang="ts">

import Background from '../background/Background.vue';
import SwiperGames from '../menu/SwiperGames.vue';

import type { Game } from '../menu/interfaces/game';

import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';


const userStore = useUserStore();

let user = storeToRefs(userStore);

const games: Game[] = [
    {
        label: 'SNAKE',
        image: '/images/menu/snake.png',
        path: '/snake',
    },
    {
        label: 'TETRIS',
        image: '/images/menu/tetris.png',
        path: '/tetris',
    },
    {
        label: 'WOLF',
        image: '/images/menu/wolf.png',
        path: '/wolf',
    },
]

</script>


<style scoped>
@import url('/src/animations/glow.css');
@import url('/src/animations/rotate.css');
@import url('/src/animations/sway.css');

.menu {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
    font-family: "Jersey 15", serif;
}

/* Верхняя часть: Earn и Лучшие игроки */
.menu-header {
    width: 100%;
    top: 0;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    backdrop-filter: blur(1px);
    border-bottom: 1px solid rgba(250, 9, 198, 0.3);
    box-shadow: 12px 19px 16px 2px rgba(250, 9, 198, 0.27);
    font-size: 15px;
    font-family: "Roboto", serif;
    color: white;
}

.leaderboard-section-label {
    width: 150px;
    text-align: center;
}

.earn-section {
    display: flex;
    align-items: center;
    gap: 5px;
    text-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
}

.earn-section-image {
    margin-top: 8px;
    width: 70px;
    height: 70px;
    animation: glow 1.5s infinite alternate;
}

.leaderboard-section {
    display: flex;
    align-items: center;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

}

.leaderboard-section-image {
    width: 50px;
    height: 80px;
    animation: glow 1.5s infinite alternate;
}

/* Средняя часть: Баланс игрока */
.balance-logo {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.balance-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    font-size: 20px;
    font-weight: 400;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    letter-spacing: 1px;
    margin-bottom: 5px;
}

.balance-label {
    color: rgb(255, 255, 255);
}

.balance-count {
    color: yellow;
}

.balance-coin {
    width: 30px;
    height: 30px;
}

/* Средняя часть: Логотип - баллерина, звезда, кольцо */
.logo-container {
    width: 450px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

.circle {
    width: 100%;
}

.circle_img {
    width: 100%;
    animation: 
        glow 1.5s infinite alternate,
        rotate 60s infinite linear;
}

.ballerina_star {
    width: 50%;
    position: absolute;
    display: flex;
    flex-direction: column;
}

.ballerina_img {
    width: 100%;
    animation: glow 1.5s infinite alternate;
}

.star_img {
    width: 30px;
    height: 30px;
    align-self: flex-end;
    animation: 
        glow 1.5s infinite alternate,
        sway 2.5s ease-in-out infinite;
}

@media (max-width: 500px) {
    .logo-container {
        width: 90vw;
    }
}

/* Нижняя часть: Карточки игр */
.games {
    margin-bottom: 5%;
}
</style>