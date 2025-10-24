<template>

  <div class="earn">

    <h2 class="activity-label label">DAILY ACTIVITY</h2>

    <DailyActivity 
      :activity="activity"
      @get-reward="getReward"
    />

    <hr>

    <h2 class="channels-label label">CHANNELS</h2>

    <ChannelCard
      v-if="channels.length > 0"
      v-for="(channel, index) in channels" :key="index"
      :channel="channel"
      :subscribeStatus="subscribeStatus"
      @check-subscribe="checkSubscribe"
      @restore-status="restoreStatus"
      @let-reward="letChannelReward"
      @remove-channel="removeChannel"
    />

    <div v-else class="label">
      NEW OFFERS COMING VERY SOON..
    </div>

  </div>

</template>

<script setup lang="ts">

import { ref, onMounted } from 'vue';

import ChannelCard from './ChannelCard.vue';
import DailyActivity from './DailyActivity.vue';

import { useUserStore } from '@/stores/user';
import { api } from '@/api';

import type { Channel } from '@/api/types/channels';
import type { ISubscribeStatus } from '@/api/types/channels';
import type { Activity } from '@/api/types/activitys';
import type { User } from '@/api/types/users';

const userStore = useUserStore();

const channels = ref<Channel[]>([]);

const subscribeStatus = ref<ISubscribeStatus>({} as ISubscribeStatus)

const activity = ref<Activity>({} as Activity);

const checkSubscribe = async (channel: Channel) => {
  const isSubscribed = await api.channels.createSubscribe(userStore!.getUserId!, channel.id, channel.channelLink);
  subscribeStatus.value = {channelLink: channel.channelLink, isSubscribed};
}

const restoreStatus = () => {
  subscribeStatus.value = {} as ISubscribeStatus;
}

const letChannelReward = async (reward: number) => {
  const userBalance = userStore.getBalance;
  userStore.updateBalance(userBalance! + reward);
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

async function getActivity(userId: number): Promise<Activity> {
  const activity = await api.activitys.getActivity(userId);
  return activity;
}

async function getReward(): Promise<void> {
  const user: User | null = await api.activitys.getReward(userStore.getUserId!);
  if (!user) {
    return;
  }

  activity.value.isRewarded = true;

  userStore.updateBalance(user.balance);
}

onMounted(() => {
  getChannels(userStore.getUserId!)
    .then((channelsResponse: Channel[]) => {
      channels.value = channelsResponse ? channelsResponse : [];
    })

  getActivity(userStore.getUserId!)
    .then((activityResponse: Activity) => {
      activity.value = activityResponse;
    })
})

</script>

<style scoped>

.label {
  font-size: 26px;
  margin: 10px;
  text-align: center;
  color: white;
}

</style>