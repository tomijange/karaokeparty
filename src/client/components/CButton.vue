<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<script>

import {Component, Prop, Vue} from "vue-property-decorator";

@Component({})
export default class CButton extends Vue {

}

</script>

<style scoped lang="scss">

.button {
  background-color: #3a9f5c;
  border: none;
  color: white;
  font-size: 1rem;
  outline: none;
  padding: 4px 8px;
  box-shadow: 1px 1px 10px 0px #4caf506e;
  transition: box-shadow .3s;
}

.button:hover {
  box-shadow: 1px 1px 15px 1px #4caf506e;
}

.button:active {
  box-shadow: 1px 1px 15px 5px #4caf506e;
  outline: 1px solid blue;

}

</style>
