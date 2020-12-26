<template>
  <router-view/>
</template>

<script>
import './global.scss';
import {Component, Vue} from "vue-property-decorator";
@Component
export default class App extends Vue{

}
</script>

<style>
body, html {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
