<template>

  <div
    :class="[
      'daily-activity-day',
      props.activity.isRewarded == false && props.activity.streak == props.dayNumber
      ?
      'current-day'
      :
      '',
      props.activity.isRewarded && props.activity.streak == props.dayNumber 
      || 
      props.dayNumber < props.activity.streak
      ?
      'finished-day'
      :
      '',
      props.isRewardedAnimation
      && 
      props.activity.streak == props.dayNumber 
      ? 
      'status-rewarded' 
      : 
      ''
    ]"
    @animationend="emit('reset-reward-animation-status')"
  >
    {{ props.dayNumber }}
  </div>

</template>


<script setup lang="ts">
import type { Activity } from '@/api/types/activitys';


interface DailyActivityDayProps {
  activity: Activity;
  isRewardedAnimation: boolean;
  dayNumber: number;
}

interface DailyActivityDayEmit {
  (e: 'reset-reward-animation-status'): void
}

const props = defineProps<DailyActivityDayProps>();

const emit = defineEmits<DailyActivityDayEmit>()

</script>


<style scoped>

@import url('/src/animations/blink-green-strong.css');

.daily-activity-day {
  padding: 5px 10px;
  margin-bottom: 5px;
  font-size: 20px;
  color: white;
  border: 2px solid white;
  border-radius: 10px;
}

.status-rewarded {
  animation: blink-green-strong 1400ms linear;
}

.current-day {
  border: 2px double red;
}

.finished-day {
  background-color: #45e61485;
  border: 2px solid #19eb11;
}

</style>