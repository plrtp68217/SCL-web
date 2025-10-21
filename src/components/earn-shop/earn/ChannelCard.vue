<template>

  <div 
    :class="[
      'channel-card',
      isStatusSuccess ? 'status-success' : '',
      isStatusError ? 'status-error' : '',
    ]"
    @animationend="restoreStatus"
  >

    <div class="channel-card-title-reward">
      
      <h2 class="channel-card-title">
        {{ props.channel.title }}
      </h2>

      <h2 class="channel-card-reward">
        REWARD: {{ props.channel.reward }}
        <img class="coin" src="/images/coin.png">
      </h2>

    </div>

    
    <div class="channel-card-description">
      {{ props.channel.description }}
    </div>

    <div class="channel-card-buttons">

      <MyButton class="channel-card-button">
        <a
          :href="'https://t.me/' + formatChannelId(props.channel.channelLink)"
          :target="'_blank'"
          class="channel-card-link"
        >
          1.SUBSCRIBE
        </a>
      </MyButton>

      <MyButton
        class="channel-card-button"
        @click="checkSubscribe"
      >
        2.CHECK_SUBSCRIBE
      </MyButton>

    </div>

  </div>

</template>


<script setup lang="ts">

import { computed } from 'vue';

import MyButton from '@/components/UI/MyButton.vue';

import type { PropType } from 'vue';
import type { Channel } from '@/api/types/channels';
import type { ISubscribeStatus } from '@/api/types/channels';

const props = defineProps({
  channel: {
    type: Object as PropType<Channel>,
    required: true
  },
  subscribeStatus: {
    type: Object as PropType<ISubscribeStatus>,
    required: true
  }
})

const emit = defineEmits(['check-subscribe', 'restore-status', 'remove-channel', 'let-reward']);

const isStatusSuccess = computed<boolean>(() => 
  props.subscribeStatus.channelLink == props.channel.channelLink &&
  props.subscribeStatus.isSubscribed == true
)

const isStatusError = computed<boolean>(() => 
  props.subscribeStatus.channelLink == props.channel.channelLink &&
  props.subscribeStatus.isSubscribed == false
)

const restoreStatus = () => {
  emit('restore-status');

  if (isStatusSuccess.value == true) {
    emit('let-reward', props.channel.reward);
    emit('remove-channel', props.channel.channelLink);
  }
}

const checkSubscribe = () => {
  emit('check-subscribe', props.channel);
}

const formatChannelId = (channelLink: string): string => {
  return channelLink[0] == '@' 
    ? channelLink.slice(1) 
    : channelLink;
}

</script>


<style scoped>

@import url('/src/animations/blink-green-strong.css');
@import url('/src/animations/blink-red-strong.css');

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

.status-success {
  animation: blink-green-strong 1400ms linear;
}

.status-error {
  animation: blink-red-strong 1400ms linear;
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
  font-size: 18px;
}

.channel-card-button:hover {
  cursor: pointer;
}

.channel-card-link {
  text-decoration: none;
  color: inherit;
}


</style>