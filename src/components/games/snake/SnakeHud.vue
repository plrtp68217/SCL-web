<template>

    <div class="snake-hud">
        <div class="snake-hud-score">Score: {{ props.score }}</div>
        <div class="snake-hud-bonuses">BONUSES</div>
    </div>

</template>


<script setup lang="ts">

let props = defineProps({
    score: Number
})

</script>


<style scoped>

.snake-hud {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 20px;
}

</style>
  