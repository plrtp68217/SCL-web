<template>

  <div
    v-if="isVisible"
    class="notification" 
    :class="{'clicked': isClicked}" 
    @click="handleMissClick"
    @animationend="isClicked = false"
  >

    <div class="notification-content" @click.stop>

      <h3 class="notification-label">{{ props.label }}</h3>

      <h2 class="notification-info">{{ props.info }}</h2>

      <MyButton @click="applyNotify">OK</MyButton>

    </div>

  </div>
    
</template>


<script setup lang="ts">

import { ref } from 'vue';
import MyButton from './MyButton.vue';

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  info: {
    type: String,
    required: true,
  }
})

const emit = defineEmits(['applyNotify'])

let isVisible = ref<boolean>(true)
let isClicked = ref<boolean>(false);

const handleMissClick = () => {
  isClicked.value = true;
};

const applyNotify = () => {
  emit('applyNotify');
  isVisible.value = false;
}

</script>


<style scoped>

@import url('/src/animations/appear.css');
@import url('/src/animations/pulse.css');

.notification {
    position: fixed;
    font-family: inherit;
    color: white;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    padding: 10px;
}

.clicked {
  animation: pulse 400ms ease-in-out;
}

.notification-content {
  display: flex;
  flex-direction: column;
  gap: 5px;
  max-width: 400px;
  width: 400px;
  padding: 8px 10px;
  background-color: rgb(70, 29, 105);
  border-radius: 10px;
}

.notification-label {
  align-self: flex-end;
}

.notification-info {
  align-self: center;
}

</style>