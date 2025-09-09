<template>

    <div
      v-if="props.isVisible"
      class="modal"
      @click="closeModal"
    >
  
      <div 
        class="modal-content"
        @click.stop
      >
  
        <header class="modal-header">
  
          <h1 class="modal-label">{{ props.label }}</h1>
  
          <MyButton
            class="modal-button"
            @click="closeModal"
          >
            EXIT
          </MyButton>
  
        </header>
  
        <slot></slot>
  
      </div>
  
    </div>
  
</template>


<script setup lang="ts">

import MyButton from './MyButton.vue';

const emit = defineEmits(['close']);

const props = defineProps(
  { 
    isVisible: {
      type: Boolean,
      required: true,
    },
    label: {
      type: String,
      required: true,
    }
  }
);

function closeModal() {
  emit('close');
}

</script>


<style scoped>

.modal {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 10;
  display: flex;
  justify-content: center;
  padding: 10px;
  animation: openModal 500ms forwards;
}

@keyframes openModal {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@media (max-width: 481px) {
    .modal {
      width: 100%;
    }
}

.modal-content {
  width: 481px;
  background-color: #3e065fc4;
  box-shadow: 0 0 10px rgb(180, 0, 252);
  border-radius: 10px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  font-family: inherit;
  font-size: 12px;
  color: white;
}

.modal-label {
  margin: 8px;
  text-decoration: underline;
}

.modal-button {
  width: auto;
  background-color: rgba(138, 0, 131, 0.76);
  border-bottom-left-radius: 10px;
  border-top-right-radius: 10px;
}
</style>