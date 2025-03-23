<template>

<button class="my-button">

  <slot></slot>

</button>
    
</template>


<script setup lang="ts">

</script>


<style scoped>

.my-button {
  padding: 4px 6px;
  background: transparent;
  background-color: rgba(137, 43, 226, 0.541);
  border: none;
  border-radius: 5px;
  font-size: 20px;
  color: white;
  transition: transform 0.1s ease;
}

.my-button:active {
  transform: scale(0.95);
}


</style>