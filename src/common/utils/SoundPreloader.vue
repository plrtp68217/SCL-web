<template>
  <div v-if="isClient && loading && props.showLoader" class="sound-preloader">
    ⏳ Загружаем звуки... ({{ loadedCount }}/{{ totalCount }})
  </div>
  
  <slot v-if="!isClient || !loading || !props.showLoader"></slot>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useSound } from './useSound';

const props = withDefaults(defineProps<{
  showLoader?: boolean;
}>(), {
  showLoader: true,
});

const soundFiles = [
  { name: 'snake-pickup-apple', path: 'sounds/snake-pickup-apple.wav' },
  { name: 'snake-move', path: 'sounds/snake-move.wav' },
  { name: 'tetris-filled-line', path: 'sounds/tetris-filled-line.wav' },
  { name: 'tetris-shape-falled', path: 'sounds/tetris-shape-falled.wav' },
  { name: 'wolf-pickup-egg', path: 'sounds/wolf-pickup-egg.wav' },
  { name: 'game-over', path: 'sounds/game-over.wav' },
];

const { loadSound, getLoadedSounds } = useSound();
const loading = ref(true);
const loadedCount = ref(0);
const totalCount = ref(soundFiles.length);
const isClient = ref(false);

// Добавляем таймаут для отладки
let loadTimeout: number | null = null;

onMounted(() => {
  console.log('🎵 SoundPreloader mounted');
  isClient.value = true;
  
  // Задержка для отладки
  loadTimeout = setTimeout(loadSounds, 100);
});

onUnmounted(() => {
  if (loadTimeout) {
    clearTimeout(loadTimeout);
  }
});

const loadSounds = async () => {
  if (typeof window === 'undefined') {
    console.log('🚫 Server side - skipping sound loading');
    loading.value = false;
    return;
  }

  console.log('🚀 Начало загрузки звуков на клиенте...');
  console.log('📍 Location:', window.location.href);
  
  try {
    for (const { name, path } of soundFiles) {
      try {
        console.log(`📦 Загрузка: ${name} из ${path}`);
        
        const response = await fetch(path);
        console.log(`📊 Status: ${response.status} ${response.statusText}`);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        
        const arrayBuffer = await response.arrayBuffer();
        console.log(`📁 Размер: ${arrayBuffer.byteLength} bytes`);
        
        await loadSound(name, arrayBuffer);
        console.log(`✅ Успешно: ${name}`);
        loadedCount.value++;
        
      } catch (error) {
        console.error(`❌ Ошибка загрузки ${name}:`, error);
      }
    }
  } catch (error) {
    console.error('💥 Критическая ошибка загрузки звуков:', error);
  } finally {
    console.log('🎯 Загрузка завершена');
    console.log('📋 Загруженные звуки:', getLoadedSounds());
    loading.value = false;
  }
};
</script>