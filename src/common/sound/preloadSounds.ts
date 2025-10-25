import { ref } from 'vue';
import { useSound } from './useSound';

const soundFiles = [
  { name: 'snake-pickup-apple', path: 'sounds/snake-pickup-apple.wav' },
  { name: 'snake-move', path: 'sounds/snake-move.wav' },
  { name: 'tetris-filled-line', path: 'sounds/tetris-filled-line.wav' },
  { name: 'tetris-shape-falled', path: 'sounds/tetris-shape-falled.wav' },
  { name: 'wolf-pickup-egg', path: 'sounds/wolf-pickup-egg.wav' },
  { name: 'game-over', path: 'sounds/game-over.wav' },
  { name: 'menu-background', path: 'sounds/menu-background.mp3' },
  { name: 'tetris-background', path: 'sounds/tetris-background.mp3' },
  { name: 'snake-background', path: 'sounds/snake-background.mp3' },
  { name: 'wolf-background', path: 'sounds/wolf-background.mp3' },
];

const { loadSound, getLoadedSounds } = useSound();
const loading = ref(true);
const loadedCount = ref(0);
const totalCount = ref(soundFiles.length);
const loadErrors = ref<string[]>([]);

export const preloadSounds = async () => {
  console.log('🚀 Начало загрузки звуков...');
  console.log('Base URL:', import.meta.env.BASE_URL);
  console.log('Current location:', window.location.href);
  
  for (const { name, path } of soundFiles) {
    try {
      // Пробуем разные варианты путей
      const pathsToTry = [
        path, // relative
        '/' + path, // absolute
        import.meta.env.BASE_URL + path, // with base url
        import.meta.env.BASE_URL + path.replace(/^\//, '') // without leading slash
      ];
      
      let success = false;
      
      for (const tryPath of pathsToTry) {
        try {
          const response = await fetch(tryPath);
          
          if (!response.ok) {
            console.error(`❌ HTTP error: ${response.status} для ${tryPath}`);
            continue;
          }
          
          const arrayBuffer = await response.arrayBuffer();
          await loadSound(name, arrayBuffer);
          loadedCount.value++;
          success = true;
          break;
          
        } catch (fetchError) {
          console.error(`❌ Ошибка fetch для ${tryPath}:`, fetchError);
        }
      }
      
      if (!success) {
        console.error(`❌ Не удалось загрузить: ${name}`);
        loadErrors.value.push(name);
      }
      
    } catch (error) {
      console.error(`❌ Общая ошибка загрузки ${name}:`, error);
      loadErrors.value.push(name);
    }
  }
  
  console.log('📊 Результаты загрузки:');
  console.log('- Успешно:', getLoadedSounds());
  console.log('- Ошибки:', loadErrors.value);
  console.log('- Всего файлов:', totalCount.value);
  console.log('- Загружено:', loadedCount.value);
  
  loading.value = false;
}