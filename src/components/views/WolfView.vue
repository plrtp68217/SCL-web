<template>

    <div class="wolf-container">

        <Background/>
    
        <div class="header">
            <GameHeader/>
        </div>
    
        <div class="main">
            <Wolf
                :bestScore="wolfRecord.score"
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
import GameHeader from '../game-layout/GameHeader.vue';
import GameFooter from '../game-layout/GameFooter.vue';
import Wolf from '../games/wolf/Wolf.vue';

import type { GameId } from '../games/common/types/records';

import { useUserStore } from '@/stores/user';

import { api } from '@/api';
import { onMounted } from 'vue';
import { logUserAction } from '@/logging/logUserAction';

const gameId: GameId = 'wolf';

const userStore = useUserStore();
const userId = userStore.getUserId;
const userName = userStore.getName;

const wolfRecord = userStore.findRecordByGameId(gameId);

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
})

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
  