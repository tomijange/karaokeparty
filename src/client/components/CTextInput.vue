<template>
  <div class="input">
    <label :for="id">{{ labelText }}</label>
    <input :id="id" v-bind="$attrs" type="text" placeholder="Enter your username" @keydown="e => $emit('input', e.target.value)"/>

  </div>
</template>

<script>

import {Component, Prop, Vue} from "vue-property-decorator";

@Component({
  props: ["id", "labelText"]
})
export default class CTextInput extends Vue {


}

</script>

<style scoped lang="scss">

.input {
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 1px #3a9f5c;
  background-color: #fff;
}

.input input {
  padding: 3px;
  outline: none;
  border: none;
  border-radius: inherit;
  font-size: 1rem;
  background-color: inherit;
}

.input label {
  padding: 3px;
}

.input input:active {

}

.input:hover label {
  animation: labelAnim 0.5s ease-in-out;
}

@keyframes labelAnim {
  0%, 100% {
    text-shadow: 0 0 0px rgba(255, 255, 255, 0.5);
  }
  50% {
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.75);
  }
}
</style>
