<template>
  <button 
    v-bind="$attrs" 
    v-on="$listeners" 
    :class="{
      button: true,
      disabled: disabled
    }" 
    :style="{ '--color': color }">
    <slot></slot>
  </button>
</template>

<script lang="ts">

import {Component, Vue, Prop} from "vue-property-decorator";

@Component({})
export default class CButton extends Vue {

  @Prop({default: 'red'})
  readonly color!: string;

  @Prop({default: false})
  readonly disabled!: boolean;

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

  &.disabled {
    box-shadow: none!important;
    user-select: none;
    cursor: default;
    pointer-events: none;
    background-color: rgba(182, 182, 182, 0.76);
    color: rgb(133, 133, 133);
  }

  &:hover{
    box-shadow: 1px 1px 8px 1px var(--color);
  }

  &:active {
    box-shadow: 1px 1px 2px 1px var(--color);
  }
}

</style>
