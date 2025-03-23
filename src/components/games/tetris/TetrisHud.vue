<template>
    <div class="tetris-hud">

        <div class="tetris-hud-score">Score: {{ props.score }}</div>

        <div class="tetris-hud-bonuses">

            <div class="tetris-hud-bonuses-title">Bonuses:</div>

            <div class="tetris-hud-bonuses-variants">
                <div class="tetris-hud-bonuses-variant">5 /*</div>
                <div class="tetris-hud-bonuses-variant">3 O*</div>
                <div class="tetris-hud-bonuses-variant">1 |_|=*</div>
            </div>

        </div>

    </div>
</template>


<script setup lang="ts">

const props = defineProps(
    {
        score: {
            type: Number,
            required: true,
        }
    }
)

</script>


<style scoped>

.tetris-hud {
    color: white;
    font-size: 20px;
}

</style>