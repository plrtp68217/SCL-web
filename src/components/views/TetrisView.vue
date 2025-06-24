<template>

    <div class="tetris-container">
        
        <Background/>
    
        <div class="header">
            <GameHeader/>
        </div>
    
        <div class="main">
            <Tetris
                :bestScore="tetrisRecord.score"
                @newScore="updateScore"
            />
        </div>
    
        <div class="footer">
            <GameFooter/>
        </div>

    </div>

</template>


<script setup lang="ts">
import Tetris from "@/components/games/tetris/Tetris.vue";
import Background from '../background/Background.vue';
import GameHeader from '../game-layout/GameHeader.vue';
import GameFooter from '../game-layout/GameFooter.vue';

import type { GameId } from '../games/common/types/records';

import { useUserStore } from '@/stores/user';
import { api } from '@/api';
import { onMounted } from "vue";
import { logUserAction } from "@/logging/logUserAction";

const gameId: GameId = 'tetris';

const userStore = useUserStore();
const userId = userStore.getUserId;
const userName = userStore.getName;

const tetrisRecord = userStore.findRecordByGameId(gameId);

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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

</style>