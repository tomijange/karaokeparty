<template>
  <div class="card">
    <slot></slot>
  </div>
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
export default class CCard extends Vue {

}

</script>

<style scoped lang="scss">
.card {
  box-shadow: 1px 1px 15px 5px #d7d7d7;
  padding: 24px;
  background-color: #fefefe;
}

</style>
