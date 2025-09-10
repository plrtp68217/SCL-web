<template>

  <div v-if="loading && showLoader" class="sound-preloader">
    ⏳ Загружаем звуки...
  </div>
  
  <slot v-if="!loading || !showLoader"></slot>

</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

import { useSound } from './useSound';

const props = withDefaults(defineProps<{
  showLoader?: boolean;
  sounds?: Array<{
    name: string;
    path: string;
  }>;
}>(), {
  showLoader: true,
  sounds: () => [
    { name: 'snake-pickup-apple', path: '/sounds/snake-pickup-apple.wav' },
    { name: 'snake-move', path: '/sounds/snake-move.wav' },
    { name: 'tetris-filled-line', path: '/sounds/tetris-filled-line.wav' },
    { name: 'tetris-shape-falled', path: '/sounds/tetris-shape-falled.wav' },
    { name: 'wolf-pickup-egg', path: '/sounds/wolf-pickup-egg.wav' },
    { name: 'game-over', path: '/sounds/game-over.wav' },
  ]
});

const { loadSound, getLoadedSounds } = useSound();
const loading = ref(true);

onMounted(async () => {
  console.log('🚀 Начало загрузки звуков...');
  console.log('📁 Пути к файлам:', props.sounds.map(s => s.path));
  
  for (const { name, path } of props.sounds) {
    try {
      console.log(`📦 Загрузка: ${name} из ${path}`);
      
      const response = await fetch(path);
      console.log(`📊 Статус ответа для ${path}:`, response.status, response.statusText);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} - ${response.statusText}`);
      }
      
      const arrayBuffer = await response.arrayBuffer();
      console.log(`📊 Размер arrayBuffer для ${name}:`, arrayBuffer.byteLength, 'bytes');
      
      await loadSound(name, arrayBuffer);
      console.log(`✅ Успешно загружен: ${name}`);
      
    } catch (error) {
      console.error(`❌ Ошибка загрузки ${name}:`, error);
    }
  }
  
  console.log('✅ Загрузка завершена');
  console.log('🎵 Загруженные звуки:', getLoadedSounds());
  loading.value = false;
});
</script>