<template>
  <ul class="song-list">
    <slot></slot>
  </ul>
</template>

<script lang="ts">

import {Component, Prop, Vue} from "vue-property-decorator";

@Component({ })
export default class CSongList extends Vue {
}

</script>

<style scoped lang="scss">

.song-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

</style>
