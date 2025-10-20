<template>

  <div class="earn">

    <ChannelCard
      v-for="index in 10" :key="index"
      :title="'TITLE'"
      :reward="200"
      :description="'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum'"
    />
    

  </div>

</template>

<script setup lang="ts">

import ChannelCard from './ChannelCard.vue';

</script>

<style scoped>

</style>