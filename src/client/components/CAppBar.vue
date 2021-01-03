<template>
  <div class="app-bar">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
@Component({})
export default class CAppBar extends Vue {
}
</script>

<style scoped lang="scss">
.app-bar {
  display: flex;
  align-content: center;
  justify-content: center;
  
  --color: #8b0fff;
  box-shadow: 0 0 7px 1px var(--color);
  height: 48px;
  padding: 8px 2px;
  background-color: var(--color);
  z-index: 1000;
  color: white;
}
</style>