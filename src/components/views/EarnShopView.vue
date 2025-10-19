<template>

  <div class="earn-shop">

    <header class="header">

      <MyButton 
        :class="['header-button', panels['earn'] ? 'active' : '']"
        @click="changePanel('earn')"
      >
        EARN
      </MyButton>

      <MyButton 
        :class="['header-button', panels['shop'] ? 'active' : '']"
        @click="changePanel('shop')"
      >
        SHOP
      </MyButton>

    </header>

    <main class="main">

      <div v-if="panels['earn']">
        <Earn/>
      </div>

      <div v-else-if="panels['shop']">
        <Shop/>
      </div>

    </main>

  </div>

</template>

<script setup lang="ts">

import { ref } from 'vue';

import MyButton from '../UI/MyButton.vue';
import Earn from '../earn-shop/Earn.vue';
import Shop from '../earn-shop/Shop.vue';

interface IPanels {
  [panelId: string]: boolean
}

let panels = ref<IPanels>({
  'earn': false,
  'shop': true,
})

function changePanel(id: 'earn' | 'shop'): void {
 for(let panelId in panels.value) {
    panels.value[panelId] = panelId === id ? true : false
  }
}

</script>

<style scoped>

.earn-shop {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.header {
  display: flex;
  justify-content: start;
  padding: 5px 10px 0 10px;
  gap: 2px;
  border-bottom: 2px solid rgba(138, 0, 131, 0.76);
}

.header-button {
  width: auto;
  background-color: rgba(138, 0, 131, 0.76);
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  box-shadow: 2px 0 2px rgba(181, 0, 252, 0.336);
}

.active {
    background-color: rgba(206, 1, 196, 0.76);
}

.main {
  height: 100%;
  overflow: auto;
}

</style>