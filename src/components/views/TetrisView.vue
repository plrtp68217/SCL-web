<template>

    <div class="tetris-container">
        
        <Background/>
    
        <GameHeader/>
    
        <div class="main">
            <Tetris
                :bestScore="tetrisRecord.score"
                @checkScore="checkScore"
                @newScore="updateScore"
                @playSound="play"
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
import { onMounted, onUnmounted } from "vue";
import { logUserAction } from "@/logging/logUserAction";

import { useSound } from '@/common/sound/useSound';

const { play, stop, backgroundSoundLevel } = useSound();

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
    play('tetris-background', backgroundSoundLevel.value / 100, true);
})

onUnmounted(() => {
    stop('tetris-background');
})


</script>

<style scoped>

.tetris-container {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.main {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

@media (max-height: 610px) {
    .main {
        align-items: flex-end;
    }
}

</style>