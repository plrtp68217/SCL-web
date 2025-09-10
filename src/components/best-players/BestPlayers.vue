<template>

<div class="best-players-container">

    <PlayerCard
      v-for="(record, index) in props.records" :key="record.userId"
      :userId="record.userId"
      :position="index + 1"
      :name="record.user.name"
      :score="record.score"
    />

</div>
    
</template>


<script setup lang="ts">

import PlayerCard from './PlayerCard.vue';

import { type BestRecord } from '@/api/types/records';
import { type PropType } from 'vue';

const props = defineProps({
  records: {
    type: Array as PropType<BestRecord[]>,
    required: true,
  }
})


</script>


<style scoped>

.best-players-container {
  height: 100%;
  font-family: inherit;
  color: white;
  padding: 5px 10px;
}


</style>