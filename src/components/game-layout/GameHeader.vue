<template>
    <div class="header">

        <div class="header-balance">
            <!-- <div class="header-balance-label">BALANCE:</div> -->

            <div class="header-balance-count">{{ formattedBalance }}</div>

            <img class="header-balance-image" src="/images/coin.png">

        </div>

        <div class="header-soundar">
            <SoundBar/>
        </div>

        <!-- <div class="header-nickname">{{ user.getName }}</div> -->
        <MyButton 
            @click="$router.push('/')"
            class="header-button"
        >
        MENU
        </MyButton>

    </div>
</template>


<script setup lang="ts">

import MyButton from '../UI/MyButton.vue';
import SoundBar from '../soundbar/SoundBar.vue';

import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { formatNumberWithMetricPrefix } from '@/common/formatNumber';


const userStore = useUserStore();

let user = storeToRefs(userStore);

const formattedBalance = computed(() => {
    return formatNumberWithMetricPrefix(user.getBalance.value!, 3)
})

</script>


<style scoped>

.header {
    width: 100%;
    max-width: 800px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    padding: 10px;
    font-size: 24px;
    color: white;
    backdrop-filter: blur(2px);
}

.header-balance {
    display: flex;
    align-items: center;
}

.header-balance-count {
    margin: 0 5px;
}

.header-balance-image {
    width: 20px;
    height: 20px;
}

.header-soundar {
    font-size: 10px;
}

.header-button {
    width: auto;
    padding: 2px 10px;
}

</style>