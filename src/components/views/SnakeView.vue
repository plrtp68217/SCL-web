<template>

    <div class="snake-container">

        <Background/>
        
        <div class="header">
            <GameHeader/>
        </div>
    
        <div class="main">
            <Snake
                :bestScore="snakeRecord.score"
                @newScore="updateScore"
            />
        </div>
    
        <div class="footer">
            <GameFooter/>
        </div>

    </div>

</template>


<script setup lang="ts">
import Background from '../background/Background.vue';
import Snake from '../games/snake/Snake.vue';
import GameHeader from '../game-layout/GameHeader.vue';
import GameFooter from '../game-layout/GameFooter.vue';

import { getTgUserData } from '@/telegram/useTelegram';

import type { GameId } from '../games/common/types/records';

import { useUserStore } from '@/stores/user';
import { api } from '@/api';

const gameId: GameId = 'snake';

const userStore = useUserStore();

const snakeRecord = userStore.findRecordByGameId(gameId);


async function updateScore(score: number) {
    const { userId } = getTgUserData();

    snakeRecord.score = score;

    await api.records.updateRecord({userId, gameId, score});
}

</script>


<style scoped>

.main {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

</style>
  