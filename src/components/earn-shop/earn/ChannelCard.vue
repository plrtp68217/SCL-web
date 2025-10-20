<template>

  <div class="channel-card">

    <div class="channel-card-title-reward">
      
      <h2 class="channel-card-title">
        {{ props.title }}
      </h2>

      <h2 class="channel-card-reward">
        REWARD: {{ props.reward }}
        <img class="coin" src="/images/coin.png">
      </h2>

    </div>

    
    <div class="channel-card-description">
      {{ props.description }}
    </div>

    <div class="channel-card-buttons">

      <MyButton class="channel-card-button">1.SUBSCRIBE</MyButton>

      <MyButton class="channel-card-button">2.VERIFY</MyButton>

    </div>

  </div>

</template>


<script setup lang="ts">

import MyButton from '@/components/UI/MyButton.vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  reward: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
})

</script>


<style scoped>

.channel-card {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 10px;
  padding: 5px 10px;
  border-radius: 10px;
  color: white;
  background-color: #7e207e85;
}

.channel-card-title-reward {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.channel-card-reward {
  display: flex;
  gap: 5px;
  align-items: center;
}

.coin {
  width: 30px;
  height: 30px;
}

.channel-card-description {
  font-size: 18px;
}

.channel-card-buttons {
  display: flex;
  gap: 10px;
  align-self: flex-end;
}

.channel-card-button {
  background-color: #f82df86c;
  border-radius: 10px;
}


</style>