<template>

  <div class="wolf">

    <div class="wolf-header">
      <WolfBoard/>
    </div>

    <div class="wolf-main">

      <div class="wolf-main-sound">
        SOUND
      </div>

      <div class="wolf-main-hud">
        <WolfHud/>
      </div>
      
    </div>

    <div class="wolf-footer">
      <WolfControl/>
    </div>


  </div>
  
</template>


<script setup lang="ts">
import WolfBoard from './WolfBoard.vue';
import WolfControl from './WolfControl.vue';
import WolfHud from './WolfHud.vue';

</script>


<style scoped>

.wolf-header {
  padding: 10px;
  border: 5px solid #3d3c3c;
  background-color: #b342f5;

}

.wolf-main {
  padding: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: rgb(204, 94, 248);
  border-left: 5px solid #3d3c3c;
  border-right: 5px solid #3d3c3c;
  color: white;
}

.wolf-footer {
  border: 5px solid #3d3c3c;
  border-top: none;
  padding: 10px;
  background-color: rgb(204, 94, 248);

}

</style>