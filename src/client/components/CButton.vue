<template>
  <button v-bind="$attrs" v-on="$listeners" class="button" :style="{ '--color': color }">
    <slot></slot>
  </button>
</template>

<script>

import {Component, Vue} from "vue-property-decorator";

@Component({
  props: {
    color: {
      type: String,
      default: 'red',
    }
  }
})
export default class CButton extends Vue {

}

</script>

<style scoped lang="scss">

.button {
  background-color: var(--color);
  border: none;
  color: rgb(239, 239, 239);
  letter-spacing: 2px;
  font-size: 1rem;
  outline: none;
  border-radius: 4px;
  padding: 8px 16px;
  box-shadow: 1px 1px 5px 0 var(--color);
  transition: box-shadow .3s;
  cursor: pointer;
}

.button:hover {
  box-shadow: 1px 1px 8px 1px var(--color);
}

.button:active {
  box-shadow: 1px 1px 2px 1px var(--color);
}

</style>
