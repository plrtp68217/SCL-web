<template>
    <div class="header">

        <div class="header-balance">
            <div class="header-balance-label">Your balance:</div>

            <div class="header-balance-count">{{ user.getBalance }}</div>

            <img class="header-balance-image" src="/images/coin.png">

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

import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();

let user = storeToRefs(userStore);

</script>


<style scoped>

.header {
    width: 100%;
    max-width: 800px;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 5px 10px;
    font-size: 24px;
    color: white;
    backdrop-filter: blur(2px);
    z-index: 1;
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

.header-button {
    width: auto;
    padding: 2px 10px;
}

</style>