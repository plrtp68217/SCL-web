<template>

  <div class="dots-spinner">

    <span class="dot-1"></span>
    <span class="dot-2"></span>
    <span class="dot-3"></span>

  </div>

</template>


<script setup lang="ts">


</script>


<style>
:root {
  --col1: #872341;
  --col2: #BE3144;
  --col3: #E17564;
}

.dots-spinner {
  width: 3.6rem;
  height: 3.4rem;
  position: relative;
  animation: spin 2s linear infinite;
}

.dots-spinner > span {
  display: block;
  --size: 1.2rem;
  height: var(--size);
  width: var(--size);
  background-color: var(--col1);
  border-radius: 50%;
  position: absolute;
  animation: pulse 3s ease-out infinite var(--delay),
             colorChange 4s linear infinite;
}

.dot-1 {
  top: 0;
  left: calc(50% - (var(--size) / 2));
  --delay: 2s;
}
.dot-2 {
  bottom: 0;
  left: 0;
  --delay: 1s;
}
.dot-3 {
  bottom: 0;
  right: 0;
  --delay: 0s;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes colorChange {
  0% {
    background-color: var(--col1);
  }
  33.33% {
    background-color: var(--col2);
  }
  66.66% {
    background-color: var(--col3);
  }
  100% {
    background-color: var(--col1);
  }
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>