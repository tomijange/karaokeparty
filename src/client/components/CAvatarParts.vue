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

<script>

import {Component, Vue} from "vue-property-decorator";

@Component({
  props: {
    avatarParts: {
      type: Array,
      default: ['🙂'],
    },
    value: {
      type: String,
      default: '',
    }
  }
})

export default class CAvatarParts extends Vue {


  onEmojiClick1(part) {
    this.$emit('input', part);
  }

}
</script>

<style scoped lang="scss">

.selected {
  background-color: dodgerblue;
}
</style>