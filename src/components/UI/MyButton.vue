<template>

<button class="my-button" v-bind="$attrs">

  <slot></slot>

</button>
    
</template>


<script setup lang="ts">

defineOptions({
  inheritAttrs: false
})

</script>


<style scoped>

.my-button {
  width: 100%;
  padding: 4px 6px;
  background: transparent;
  background-color: rgba(137, 43, 226, 0.541);
  border: none;
  font-size: 20px;
  font-family: inherit;
  color: white;
  transition: transform 0.1s ease;
  user-select: none;
  box-shadow: 4px 4px 8px 0px rgba(57, 0, 71, 0.404);
}

.my-button:active {
  transform: scale(0.95);
}


</style>