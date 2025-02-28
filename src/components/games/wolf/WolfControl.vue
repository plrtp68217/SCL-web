<template>

  <div class="wolf-control">

    <div class="wolf-control-buttons">
      <button @click="">LT</button>
      <button>LB</button>
    </div>
    
    <div class="wolf-control-buttons">
      <button>RT</button>
      <button>RB</button>
    </div> 

  </div>
  
</template>


<script setup lang="ts">
  
</script>


<style scoped>

.wolf-control {
  display: flex;
  justify-content: space-around;
}

.wolf-control-buttons {
  display: flex;
  flex-direction: column;
}

</style>