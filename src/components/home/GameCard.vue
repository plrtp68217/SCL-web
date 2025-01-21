<template>
    <div class="game-card">
        <div class="game-card-label">
            <p>{{label}}</p>
        </div>
        <img :src="image" />
    </div>
</template>


<script setup lang="ts">

interface Props {
  label: string
  image: string
}

const { label, image } = defineProps<Props>()

console.log(image)

</script>


<style scoped>
.game-card {
    height: 70%;
    width: 110px;
    text-align: center;
    background-color: rgb(249, 217, 176);
    border: 2px solid rgb(250, 186, 102);
    border-radius: 10%;
    /* box-shadow: 4px 5px rgba(0, 0, 0.5, 0.3); */
    padding: 4px 4px;
}


.game-card-label {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    background-color: rgb(36, 167, 196);
    border: 2px solid rgb(0, 144, 177);
    border-radius: 10%;
    color: white;
    text-wrap: wrap;
}
</style>