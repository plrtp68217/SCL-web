<template>

<button class="my-pause-button">

  <slot></slot>

</button>
    
</template>


<script setup lang="ts">

</script>


<style scoped>

.my-pause-button {
  position: absolute;
  width: auto;
  padding: 4px 6px;
  background: transparent;
  background-color: #cd06ff44;
  border: none;
  font-size: 20px;
  font-family: inherit;
  color: white;
  transition: transform 0.1s ease;
  user-select: none;
}

.my-pause-button:active {
  transform: scale(0.95);
}

</style>