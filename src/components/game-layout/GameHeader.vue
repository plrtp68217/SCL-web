<template>
    <div class="header">

        <div class="header-balance">

            <div class="header-balance-count">{{ formattedBalance }}</div>

            <img class="header-balance-image" src="/images/coin.png">

        </div>

        <div class="header-soundar">
            <SoundBar/>
        </div>

        <MyButton 
            @click="redirectToMenu"
            class="header-button"
        >
        MENU
        </MyButton>

    </div>

    <Confirm
        ref="confirmRef"
        :info="confirmInfo"
        @confirm="router.push('/')"
    />
</template>


<script setup lang="ts">

import MyButton from '../UI/MyButton.vue';
import SoundBar from '../soundbar/SoundBar.vue';
import Confirm from '../UI/Confirm.vue';

import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { computed, ref, type Component } from 'vue';
import { formatNumberWithMetricPrefix } from '@/common/formatNumber';
import { useRouter } from 'vue-router';


const userStore = useUserStore();
let user = storeToRefs(userStore);

const router = useRouter();

const confirmRef: Component = ref(null);
const confirmInfo: string = 'Are you sure you want to get out? All saves will be lost.'

const formattedBalance = computed(() => {
    return formatNumberWithMetricPrefix(user.getBalance.value!, 3)
})

const redirectToMenu = () => {
    confirmRef.value.show();
  }

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