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
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 150px;
    width: 110px;
    text-align: center;
    border-radius: 10%;
    box-shadow: 0px 0px 42px 0px rgba(238, 16, 222, 0.27);
    padding: 4px 4px;
    flex: 1 1 auto;
}


.game-card-label {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    margin-bottom: 5px;
    border-radius: 10%;
    color: rgb(243, 185, 255);
    font-family: "Roboto", serif;
    font-size: 15px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    text-wrap: wrap;
}

.game-card-image {
    width: 100%;
    object-fit: cover;
}
</style>