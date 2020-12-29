<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script>
import './global.scss';
import {Component, Vue} from "vue-property-decorator";
@Component
export default class App extends Vue {
}
</script>

<style lang="scss">
body, html {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  background: radial-gradient(#ffffff, #eeeeee);
  background-attachment: fixed;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 64px 2px;
  overflow: auto;
  
}
</style>
