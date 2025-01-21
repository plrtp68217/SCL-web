<template>
    <div class="game-card">
        <div class="game-card-label">
            <p>{{label}}</p>
        </div>
        <img class="game-card-image" :src="image" />
    </div>
</template>


<script setup lang="ts">

interface Props {
  label: string
  image: string
}

const { label, image } = defineProps<Props>()

</script>


<style scoped>
.game-card {
    height: 200px;
    width: 110px;
    text-align: center;
    border-radius: 10%;
    box-shadow: 12px 12px 13px -5px rgba(238, 232, 16, 0.27);
    padding: 4px 4px;
}


.game-card-label {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    margin-bottom: 5px;
    /* background-color: rgb(36, 167, 196); */
    /* border: 2px solid rgb(0, 144, 177); */
    border-radius: 10%;
    color: yellow;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    text-wrap: wrap;
}
</style>