<template>

    <div class="wolf-container">

        <Background/>
    
        <GameHeader/>
    
        <div class="main">
            <Wolf
                :bestScore="wolfRecord.score"
                @checkScore="checkScore"
                @newScore="updateScore"
                @playSound="play"
            />
        </div>

    </div>

</template>


<script setup lang="ts">
import Background from '../background/Background.vue';
import GameHeader from '../game-layout/GameHeader.vue';
import Wolf from '../games/wolf/Wolf.vue';

import type { GameId } from '../games/common/types/records';

import { useUserStore } from '@/stores/user';

import { api } from '@/api';
import { onMounted, onUnmounted } from 'vue';
import { logUserAction } from '@/logging/logUserAction';

import { useSound } from '@/common/utils/useSound';

const { play, stop, backgroundSoundLevel } = useSound();

const gameId: GameId = 'wolf';

const userStore = useUserStore();
const userId = userStore.getUserId;
const userName = userStore.getName;

const wolfRecord = userStore.findRecordByGameId(gameId);

async function checkScore(score: number) {
    if (score > wolfRecord.score) {
        await updateScore(score)
    }
}

async function updateScore(score: number) {

    if (userId) {
        wolfRecord.score = score;
    
        await api.records.updateRecord({userId, gameId, score});
    }
    else {
        // читать tetrisView
    }
}

onMounted(() => {
    logUserAction({name: userName!, action: gameId})
    play('wolf-background', backgroundSoundLevel.value / 100, true);
})

onUnmounted(() => {
    stop('wolf-background');
})

</script>


<style scoped>

.wolf-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.main {
    width: 100%;
    max-width: 800px;
    height: 100vh;
    display: grid;
    align-content: center;
}

@media (max-height: 500px) {
    .main {
        align-content: flex-end;
    }
}

</style>
  