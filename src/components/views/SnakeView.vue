<template>

    <div class="snake-container">

        <Background/>
        
        <div class="header">
            <GameHeader/>
        </div>
    
        <div class="main">
            <Snake
                :bestScore="snakeRecord.score"
                @checkScore="checkScore"
                @newScore="updateScore"
                @playSound="playSound"
            />
        </div>
    
    </div>

</template>


<script setup lang="ts">
import Background from '../background/Background.vue';
import Snake from '../games/snake/Snake.vue';
import GameHeader from '../game-layout/GameHeader.vue';

import type { GameId } from '../games/common/types/records';

import { useUserStore } from '@/stores/user';
import { api } from '@/api';
import { onMounted } from 'vue';
import { logUserAction } from '@/logging/logUserAction';

import { useSound } from '@/common/utils/useSound';

const { play} = useSound();

const playSound = (soundName: string, volume: number = 0.5) => {
    play(soundName, volume);
};

const gameId: GameId = 'snake';

const userStore = useUserStore();
const userId = userStore.getUserId;
const userName = userStore.getName;

const snakeRecord = userStore.findRecordByGameId(gameId);

async function checkScore(score: number) {
    if (score > snakeRecord.score) {
        await updateScore(score)
    }
}

async function updateScore(score: number) {
    if (userId) {
        snakeRecord.score = score;
    
        await api.records.updateRecord({userId, gameId, score});
    }
    else {
        // читать tetrisView
    }
}

onMounted(() => {
    logUserAction({name: userName!, action: gameId});
});

</script>


<style scoped>

.main {
    height: 100vh;
    display: grid;
    align-content: center;
}

@media (max-height: 700px) {
    .main {
        align-content: flex-end;
    }
}

</style>
  