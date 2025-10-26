<template>
  
  <div
    v-if="isVisible"
    class="confirm" 
    :class="{'clicked': isClicked}" 
    @click="handleMissClick"
    @animationend="isClicked = false"
  >

    <div class="confirm-content" @click.stop>

      <h3 class="confirm-label">CONFIRM ACTION</h3>

      <p class="confirm-info">{{ props.info }}</p>


      <div class="confirm-buttons">
        <MyButton @click="confirm">YES</MyButton>
        <MyButton @click="cancel">NO</MyButton>
      </div>

    </div>

  </div>

</template>


<script setup lang="ts">

import { ref } from 'vue';
import MyButton from './MyButton.vue';

interface ConfrimEmit {
  (e: 'show'): void
  (e: 'hide'): void
  (e: 'confirm'): void
  (e: 'cancel'): void
}

const emit = defineEmits<ConfrimEmit>();

interface ConfirmProps {
  info: string;
}

const props = defineProps<ConfirmProps>();

const isVisible = ref<boolean>(false);
const isClicked = ref<boolean>(false);

const handleMissClick = () => {
  isClicked.value = true;
};

const show = () => {
  isVisible.value = true;
  emit('show');
}

const hide = () => {
  isVisible.value = false;
  emit('hide');
}

const confirm = () => {
  emit('confirm');
  hide();
}

const cancel = () => {
  hide();
  emit('cancel');
}

defineExpose({
  show,
  hide,
})

</script>


<style scoped>

@import url('/src/animations/pulse.css');
@import url('/src/animations/appear.css');

.confirm {
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
    background-color: #00000060;
}

.clicked {
  animation: pulse 400ms ease-in-out;
}

.confirm-content {
  display: flex;
  flex-direction: column;
  gap: 5px;
  max-width: 400px;
  width: 400px;
  padding: 8px 10px;
  background-color: rgb(70, 29, 105);
  border-radius: 10px;
  animation: appear 800ms forwards;
  
}

.confirm-label {
  align-self: flex-end;
}

.confirm-info {
  font-size: 24px;
}

.confirm-buttons {
  display: flex;
  gap: 5px;
}

</style>