import { ref, toRaw, watch  } from 'vue';

let soundInstance: ReturnType<typeof createSound> | null = null;

export function createSound() {
  const audioContext = ref<AudioContext | null>(null);
  const sounds = ref<Map<string, AudioBuffer>>(new Map());
  const isMuted = ref(false);
  const currentMusic = ref<string | null>(null);

  const activeSounds = new Map();
  
  // Добавляем флаг инициализации
  const isInitialized = ref(false);
  const hasResumed = ref(false);

  const backgroundSoundLevel = ref<number>(10);

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

  const resumeContext = async () => {
    await audioContext.value!.resume()
    hasResumed.value = true;
  }

  const play = (name: string, volume: number = backgroundSoundLevel.value / 100, loop: boolean = false): void => {
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

      activeSounds.set(name, {source, gainNode});

      source.buffer = sound;
      gainNode.gain.value = volume;
      source.loop = loop;

      source.connect(gainNode);
      gainNode.connect(audioContext.value.destination);
      source.start(0);

      if (loop == false) {
        source.onended = () => {
          console.log(`Sound "${name}" finished playing`);
          activeSounds.delete(name);
        };

      }

      
      console.log(`🎵 Воспроизводится: ${name}`);
    } catch (error) {
      console.error(`❌ Ошибка воспроизведения ${name}:`, error);
    }
  };

  const stop = (name: string) => {
  const { source } = activeSounds.get(name);
  if (source) {
    source.stop(); // Останавливаем воспроизведение
    activeSounds.delete(name); // Удаляем из Map
    console.log(`Трек ${name} отключен`);
  }
}

  const getLoadedSounds = (): string[] => {
    return Array.from(toRaw(sounds.value).keys());
  };

  // Переключение mute/unmute
  const toggleMute = () => {
    isMuted.value = !isMuted.value;
    console.log(`isMuted: ${isMuted.value}`);
  };

  const changeSoundLevel = () => {
    if (activeSounds.size == 0) {
      return;
    }

    const { gainNode } = activeSounds.values().next().value;
    gainNode.gain.value = backgroundSoundLevel.value / 100;
  }

  watch(backgroundSoundLevel, () => {
    changeSoundLevel();
  })

  return {
    loadSound,
    resumeContext,
    play,
    stop,
    toggleMute,
    getLoadedSounds,
    changeSoundLevel,
    isMuted,
    currentMusic,
    isInitialized,
    hasResumed,
    backgroundSoundLevel
  };
}


export function useSound() {
  if (!soundInstance) {
    soundInstance = createSound();
  }
  return soundInstance;
}