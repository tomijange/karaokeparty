<template>
  <div class="input">
    <label :for="id">{{ labelText }}</label>
    <input :id="id" v-bind="$attrs" type="text" placeholder="Enter your username" @keydown="onInput"/>

  </div>
</template>

<script>

import {Component, Prop, Vue} from "vue-property-decorator";

@Component({
  props: ["id", "labelText"]
})
export default class CTextInput extends Vue {
  onInput(e) {
    this.$emit('input', e.target.value);
  }
}

</script>

<style scoped lang="scss">

.input {
  display: flex;
  flex-direction: row;
  box-shadow: 0 0 5px 1px #d7d7d7;
  background-color: #fff;
}

.input input {
  margin: 8px;
  padding: 0;
  outline: none;
  border: none;
  border-radius: inherit;
  font-size: 1rem;
  background-color: inherit;
  width: 100%;

}

.input label {
  padding: 8px;
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
