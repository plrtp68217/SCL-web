<template>

    <div class="tetris-container">
        
        <Background/>
    
        <GameHeader/>
    
        <div class="main">
            <Tetris
                :bestScore="tetrisRecord.score"
                @checkScore="checkScore"
                @newScore="updateScore"
                @playSound="playSound"
            />
        </div>

    </div>

</template>


<script setup lang="ts">
import Tetris from "@/components/games/tetris/Tetris.vue";
import Background from '../background/Background.vue';
import GameHeader from '../game-layout/GameHeader.vue';

import type { GameId } from '../games/common/types/records';

import { useUserStore } from '@/stores/user';
import { api } from '@/api';
import { onMounted } from "vue";
import { logUserAction } from "@/logging/logUserAction";

import { useSound } from '@/common/utils/useSound';

const { play} = useSound();

const playSound = (soundName: string, volume: number = 0.5) => {
    console.log(soundName);
    play(soundName, volume);
};

const gameId: GameId = 'tetris';

const userStore = useUserStore();
const userId = userStore.getUserId;
const userName = userStore.getName;

const tetrisRecord = userStore.findRecordByGameId(gameId);

async function checkScore(score: number) {
    if (score > tetrisRecord.score) {
        await updateScore(score)
    }
}

async function updateScore(score: number) {
    if (userId) {
        tetrisRecord.score = score;
    
        await api.records.updateRecord({userId, gameId, score});
    }
    else {
        // поднять ошибку, обработать ее,
        // принять на стороне вызова
        // вывести уведомление (отдельный компонент - Уведомление.vue)
    }
}

onMounted(() => {
    logUserAction({name: userName!, action: gameId});
})


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