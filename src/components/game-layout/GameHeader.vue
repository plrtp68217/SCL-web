<template>
    <div class="header">

        <div class="header-balance">
            <div class="header-balance-label">Your balance:</div>

            <div class="header-balance-count">{{ user.getBalance }}</div>

            <img class="header-balance-image" src="/images/coin.png">

        </div>

        <div class="header-nickname">{{ user.getName }}</div>

    </div>
</template>


<script setup lang="ts">

import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();

let user = storeToRefs(userStore);

</script>


<style scoped>

.header {
    position: fixed;
    width: 100%;
    padding: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 24px;
    color: white;
    backdrop-filter: blur(2px);
    z-index: 1;
}

.header-balance {
    display: flex;
}

.header-balance-count {
    margin: 0 5px;
}

.header-balance-image {
    width: 30px;
    height: 30px;
}

</style>