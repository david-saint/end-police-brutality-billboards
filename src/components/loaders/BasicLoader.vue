<style>
.lds-dual-ring {
  display: inline-block;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 46px;
  height: 46px;
  margin: 1px;
  border-radius: 50%;
  border: var(--thickness) solid var(--color);
  border-color: var(--color) transparent var(--color) transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

<template>
  <div class="lds-dual-ring" :style="{'--color': color, '--thickness': `${thickness}px`}"></div>
</template>

<script>
export default {
  name: 'basic-loader',
  props: {
    color: {
      default: 'grey',
    },
    thickness: {
      type: Number,
      default: 5,
    },
  },
};
</script>
