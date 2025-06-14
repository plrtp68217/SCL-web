<template>

  <div class="container-error">

    <div class="circle-error-border"></div>

    <div class="circle-error">

        <div class="error"></div>
        
    </div>

  </div>

</template>


<script setup lang="ts">


</script>


<style>

:root {
  --color-red: #872341;
  --circle-size: 60px;
}

.circle-error,
.circle-error-border {
  width: var(--circle-size);
  height: var(--circle-size);
  border-radius: 50%;
}

.circle-error {
  z-index: 1;
  position: relative;
  background: #09122C;
  transform: scale(1);
  animation: success-anim 1500ms ease infinite;
}

.circle-error-border {
  z-index: 0;
  position: absolute;
  transform: scale(1.1);
  animation: circle-anim 1500ms ease infinite;
  background: var(--color-red);
}

@keyframes success-anim {
  0% {
    transform: scale(0);
  }
  30% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes circle-anim {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1.1);
  }
}

.error::before,
.error::after {
  content: "";
  display: block;
  height: 4px;
  background: var(--color-red);;
  position: absolute;
}

.error::before {
  width: 40px;
  top: 48%;
  left: 16%;
  transform: rotateZ(50deg);
}

.error::after {
  width: 40px;
  top: 48%;
  left: 16%;
  transform: rotateZ(-50deg);
}

</style>