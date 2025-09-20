<template>

  <div class="modal">

    <slot></slot>
    
  </div>
    
</template>


<script setup lang="ts">

</script>


<style scoped>
@import url(../../animations/appear.css);

.modal {
  position: absolute;
  inset: 0;
  backdrop-filter: blur(8px);
  animation: appear 600ms ease-in-out;
}

</style>