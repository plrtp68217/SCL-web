<template>

    <div @click="$router.push('/')" class="footer">
        MENU
    </div>
    
</template>


<script setup lang="ts">

</script>


<style scoped>

.footer {
    position: fixed;
    bottom: 0px;
    width: 100%;
    padding: 0 5px;
    height: 80px;
    backdrop-filter: blur(2px);
    font-size: 24px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
}

</style>