<template>

  <div class="game-menu-container">

    <h1 class="game-menu-container__title">
      {{ props.title }}
    </h1>

    <div v-if="gameIsOver">

      <h2 class="game-menu-container__score">
        SCORE: {{ props.score }}
      </h2>

    </div>

    <div v-else>

      <h2 class="game-menu-container__score">
        BEST SCORE: {{ props.bestScore }}
      </h2>

    </div>

    <div class="game-menu-container__level">

      <h2 class="game-menu-container__level-title">LEVEL</h2>

      <div class="game-menu-container__level-buttons">
        <MyButton
          @click="updateLevel('easy')"
          :class="[
            'game-menu-container__level-button', 
            'button-easy',
            props.level === 'easy' ? 'active-easy': ''

          ]"
        >
          EASY
        </MyButton>

        <MyButton
          @click="updateLevel('medium')"
          :class="[
            'game-menu-container__level-button', 
            'button-medium',
            props.level === 'medium' ? 'active-medium': ''

          ]"
        >
          MEDIUM
        </MyButton>

        <MyButton
          @click="updateLevel('hard')"
          :class="[
            'game-menu-container__level-button', 
            'button-hard',
            props.level === 'hard' ? 'active-hard': ''
          ]"
        >
          HARD
        </MyButton>

      </div>

       <div class="game-menu-container__play">
      <MyButton
        class="game-menu-container__play-button"
        @click="emit('startGame')"
      >
        PLAY
      </MyButton>
    </div>

      <div class="game-menu-container__menu">
        <MyButton
          @click="$router.push('/')"
        >
          MENU
        </MyButton>
      </div>

    </div>

  </div>
    
</template>


<script setup lang="ts">

import MyButton from '../UI/MyButton.vue';

const emit = defineEmits(['startGame', 'update:level']);

const props = defineProps({
  level: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  gameIsOver: {
    type: Boolean,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  bestScore: {
    type: Number,
    required: true,
  },
})
console.log(props.level);
function updateLevel(level: string) {
  emit('update:level', level);
}

</script>


<style scoped>

.game-menu-container {
  max-width: 400px;
  height: 100%;
  margin: 20px auto;
  align-items: center;
  color: white;
  backdrop-filter: blur(5px);
  text-align: center;
}

.game-menu-container__title {
  font-size: 40px;
}

.game-menu-container__score {
  margin-top: 10px;
}

.game-menu-container__level {
  margin-top: 10px;
}

.game-menu-container__level-buttons {
  display: flex;
  gap: 5px;
  margin-top: 5px;
}

.button-easy {
  color: rgb(7, 253, 7);
}

.button-medium {
  color: rgb(240, 255, 23);
}

.button-hard {
  color: rgb(253, 23, 7);
}

.active-easy {
  border: 2px solid rgb(7, 253, 7);
}

.active-medium {
  border: 2px solid rgb(240, 255, 23);;
}

.active-hard {
  border: 2px solid rgb(253, 23, 7);
}

.game-menu-container__play {
  margin-top: 10px;
}

.game-menu-container__menu {
  margin-top: 10px;
}

</style>