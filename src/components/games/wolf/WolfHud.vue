<template>

  <div class="wolf-hud">
    <div class="wolf-hud-score">Score: {{ props.score }}</div>
    <!-- <div class="wolf-hud-bonuses">BONUSES</div> -->
  </div>
  
</template>


<script setup lang="ts">

const props = defineProps(
  {score: {
      type: Number,
      required: true,
    }
  }
)

</script>


<style scoped>

</style>