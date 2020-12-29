<template>
  <ul class="user-list">
    <slot></slot>
  </ul>
</template>

<script lang="ts">

import {Component, Prop, Vue} from "vue-property-decorator";

@Component({ })
export default class CUserList extends Vue {
}

</script>

<style scoped lang="scss">

.user-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

</style>
