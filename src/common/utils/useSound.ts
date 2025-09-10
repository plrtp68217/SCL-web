import { ref, onMounted, onUnmounted, toRaw  } from 'vue';

let soundInstance: ReturnType<typeof createSound> | null = null;

export function createSound() {
  const audioContext = ref<AudioContext | null>(null);
  const sounds = ref<Map<string, AudioBuffer>>(new Map());
  const isMuted = ref(false);
  const currentMusic = ref<string | null>(null);
  
  // Добавляем флаг инициализации
  const isInitialized = ref(false);

  const init = () => {
    if (typeof window !== 'undefined') {
      try {
        audioContext.value = new (window.AudioContext || (window as any).webkitAudioContext)();
        isInitialized.value = true;
        console.log('✅ AudioContext инициализирован');
      } catch (error) {
        console.error('❌ AudioContext ошибка инициализации:', error);
      }
    }
  };

  const loadSound = async (name: string, arrayBuffer: ArrayBuffer): Promise<void> => {
    if (!audioContext.value) init();

    if (!audioContext.value) {
      console.warn('AudioContext not available');
      return;
    }

    try {
      const audioBuffer = await audioContext.value.decodeAudioData(arrayBuffer);

      const newMap = new Map(toRaw(sounds.value));
      newMap.set(name, audioBuffer);
      sounds.value = newMap;

      console.log(`✅ Звук добавлен в Map: ${name}`);

    } catch (error) {
      console.error(`❌ Ошибка загрузки звука ${name}:`, error);
    }
  };

  const play = (name: string, volume: number = 1.0, loop: boolean = false): void => {
    console.log(`🔊 Попытка воспроизвести: ${name}, muted: ${isMuted.value}`);
    
    if (isMuted.value) {
      console.log('🔇 Звук отключен');
      return;
    }

    if (!sounds.value.has(name)) {
      console.warn(`❌ Звук не найден: ${name}`);
      return;
    }

    if (!audioContext.value) {
      console.warn('❌ AudioContext не инициализирован');
      return;
    }

    try {
      const sound = sounds.value.get(name)!;
      const source = audioContext.value.createBufferSource();
      const gainNode = audioContext.value.createGain();

      source.buffer = sound;
      gainNode.gain.value = volume;
      source.loop = loop;

      source.connect(gainNode);
      gainNode.connect(audioContext.value.destination);
      source.start(0);
      
      console.log(`🎵 Воспроизводится: ${name}`);
    } catch (error) {
      console.error(`❌ Ошибка воспроизведения ${name}:`, error);
    }
  };

  const getLoadedSounds = (): string[] => {
    return Array.from(toRaw(sounds.value).keys());
  };

  // Переключение mute/unmute
  const toggleMute = () => {
    isMuted.value = !isMuted.value;
  };


  return {
    loadSound,
    play,
    toggleMute,
    getLoadedSounds,
    isMuted,
    currentMusic,
    isInitialized // Добавляем для отладки
  };
}


export function useSound() {
  if (!soundInstance) {
    soundInstance = createSound();
  }
  return soundInstance;
}