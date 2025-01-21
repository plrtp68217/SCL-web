<template>
    <img class="menu-image-castle" src="@/images/castle-menu.jpg" alt="Мультипликационный замок на фоне реки">
    <div></div>
</template>


<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {

})

</script>


<style scoped>
.menu-image-castle {
    width: 100%;
    height: 100vh;
    object-fit: cover;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
}
</style>