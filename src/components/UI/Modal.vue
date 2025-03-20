<template>
  <div class="modal">

  </div>
    
</template>


<script setup lang="ts">

</script>


<style scoped>
@import url(../../animations/appear.css);

.modal {
  position: absolute;
  inset: 0;
  backdrop-filter: blur(5px);
  border: 2px solid rgba(108, 8, 165, 0.603);
  animation: appear 600ms ease-in-out;
}

</style>