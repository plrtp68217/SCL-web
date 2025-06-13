<template>

    <div class="wolf-container">

        <Background/>
    
        <div class="header">
            <GameHeader/>
        </div>
    
        <div class="main">
            <Wolf
                :gameId
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

import { onMounted } from 'vue';

import type { GameId } from '../games/common/types/records';
import type { Record } from '@/api/types/records';

import { useUserStore } from '@/stores/user';

import { api } from '@/api';
import { getTgUserData } from '@/telegram/useTelegram';

const gameId: GameId = 'wolf';

const userStore = useUserStore()
const wolfRecord = userStore.findRecordByGameId(gameId);

function updateScore(score: number) {
    const { userId } = getTgUserData();

    wolfRecord.score = score;

    api.records.updateRecord({userId, gameId, score});
}

onMounted(async () => {
    const { userId } = getTgUserData();

    let record: Record | null;
    
    record = await api.records.getRecord(userId, gameId);

    if (!record) {
        record = await api.records.createRecord({userId, gameId});
        userStore.addRecord(record);
    }

    // если есть в сторе -> запрос к бд не нужен. 
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
  