<template>

    <div class="tetris-control">

        <div class="tetris-control-linear">

            <div class="tetris-control-linear-h">
                <button class="control-button">LEFT</button>
                <button class="control-button">RIGHT</button>
            </div>

            <div class="tetris-control-linear-v">
                <button class="control-button">DOWN</button>
            </div>

        </div>

        <div class="tetris-control-rotate">
            <button class="control-button">ROTATE</button>
        </div>

    </div>

</template>


<script setup lang="ts">

</script>


<style scoped>

.tetris-control {
    width: 70%;
    display: flex;
    justify-content: space-around;
}

.tetris-control-linear {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
}

.tetris-control-rotate {
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>