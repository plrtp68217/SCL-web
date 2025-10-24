<template>

  <div class="daily-activity">

    <div class="daily-activity-days">

      <div class="daily-activity-day-container" v-for="dayNumber in MAX_STREAK_VALUE">
        
        <DailyActivityDay
          :activity="props.activity"
          :is-rewarded-animation="isRewardedAnimation"
          :dayNumber="dayNumber"
          @reset-reward-animation-status="isRewardedAnimation = false"
        />

        <div class="daily-activity-day-reward">
          {{ dayNumber * props.activity.reward }}
          <img class="coin" src="/images/coin.png"></img>
        </div>

      </div>

    </div>

    <MyButton 
      class="activity-reward-button"
      @click="tryGetReward"
    >
      <div v-if="props.activity.isRewarded == false">
        GET_REWARD {{ props.activity.streak * props.activity.reward }} SCL
      </div>

      <div v-else>
        IS_REWARDED 
      </div>
    </MyButton>

  </div>

</template>


<script setup lang="ts">

import { ref } from 'vue';

import MyButton from '@/components/UI/MyButton.vue';
import DailyActivityDay from './DailyActivityDay.vue';

import type { Activity } from '@/api/types/activitys';

const MAX_STREAK_VALUE = 7;

const isRewardedAnimation = ref<boolean>(false);

interface ActivityProps {
  activity: Activity
}

interface ActivityEmit {
  (e: 'get-reward'): void
}
const emit = defineEmits<ActivityEmit>();

const props = defineProps<ActivityProps>()

const tryGetReward = () => {
  if (props.activity.isRewarded == true) {
    isRewardedAnimation.value = true;
  }
  else {
    emit('get-reward');
  }
}

</script>


<style scoped>

.daily-activity {
  display: flex;
  flex-direction: column;
  margin: 10px;
  padding: 10px;
  background-color: #7e207e85;
  border-radius: 10px;
}

.daily-activity-days {
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
}

.daily-activity-day-reward {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  color: white;
}

.activity-reward-button {
  align-self: flex-end;
  background-color: #f82df86c;
  border-radius: 10px;
  font-size: 18px;
}

.coin {
  width: 20px;
  height: 20px;
}

</style>