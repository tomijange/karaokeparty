<template>
  <ul>
    <li
        v-for="part in avatarParts"
        :key="part"
        :id="part"
        @click="onEmojiClick1(part)"
        :class="value === part ? 'selected' : '' ">

      <span>{{ part }}</span>

    </li>
  </ul>
</template>

<script lang="ts">

import {Component, Prop, Vue} from "vue-property-decorator";

@Component({})
export default class CAvatarParts extends Vue {

  @Prop()
  public avatarParts!: string[];

  @Prop()
  public value!: string;


  onEmojiClick1(part: string) {
    this.$emit('input', part);
  }

}
</script>

<style scoped lang="scss">

.selected {
  background-color: dodgerblue;
}
</style>