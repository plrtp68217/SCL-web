<template>

  <div class="earn">

    <ChannelCard
      v-if="channels.length > 0"
      v-for="(channel, index) in channels" :key="index"
      :channel="channel"
      :subscribeStatus="subscribeStatus"
      @check-subscribe="checkSubscribe"
      @restore-status="restoreStatus"
      @let-reward="letReward"
      @remove-channel="removeChannel"
    />

    <div v-else class="no-chanels">
      NEW OFFERS COMING VERY SOON..
    </div>

  </div>

</template>

<script setup lang="ts">

import { ref, onMounted } from 'vue';

import ChannelCard from './ChannelCard.vue';

import { useUserStore } from '@/stores/user';
import { api } from '@/api';

import type { Channel } from '@/api/types/channels';
import type { ISubscribeStatus } from '@/api/types/channels';

const userStore = useUserStore();

const channels = ref<Channel[]>([]);

const subscribeStatus = ref<ISubscribeStatus>({} as ISubscribeStatus)

const checkSubscribe = async (channel: Channel) => {
  const isSubscribed = await api.channels.createSubscribe(userStore!.getUserId!, channel.id, channel.channelLink);
  subscribeStatus.value = {channelLink: channel.channelLink, isSubscribed};
}

const restoreStatus = () => {
  subscribeStatus.value = {} as ISubscribeStatus;
}

const letReward = async (reward: number) => {
  userStore.updateBalance(reward);
  const user = userStore.getUser!;
  await api.users.updateUser(user);
}

const removeChannel =(channelLink: string) => {
  channels.value = channels.value.filter((channel) => channel.channelLink !== channelLink);
}

async function getChannels(userId: number): Promise<Channel[]> {
  const channels: Channel[] = await api.channels.getChannels(userId);
  return channels;
}

onMounted(() => {
  getChannels(userStore.getUserId!)
    .then((channelsResponse: Channel[]) => {
      channels.value = channelsResponse ? channelsResponse : [];
    })
})

</script>

<style scoped>

.no-chanels {
  font-size: 30px;
  margin: 10px;
  text-align: center;
  color: white;
}

</style>