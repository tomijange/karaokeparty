<template>
  <div class="app">
    <c-app-bar>
      <h2>Karaokeparty🎤</h2>
    </c-app-bar>
    <div class="app-wrapper">
      <router-view />
    </div>
  </div>
</template>

<script>
import './global.scss';
import {Component, Vue} from "vue-property-decorator";
import CAppBar from './components/CAppBar.vue';

@Component({ components: { CAppBar } })
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
  display: flex;
  flex-direction: column;

  .app-wrapper {
    padding: 24px 2px;
    overflow: auto;
    flex: 1 0 0;
  }
}
</style>
