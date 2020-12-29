<template>
  <div class="avatar pa-4">
    <div class="avatar-selection m-2">
        <c-avatar-parts 
            class="avatar-heads"
            :avatar-parts="this.heads"
            v-model="avatar"
            >
        </c-avatar-parts>
    </div>
  </div>
</template>

<script lang="ts">

import {Component, Vue} from "vue-property-decorator";
import CAvatarParts from "@/client/components/CAvatarParts.vue";
import { readMe } from "../store/main/getters";
import { dispatchUpdateMe } from "../store/main/actions";

@Component({
  components: {CAvatarParts}
})
export default class CAvatar extends Vue {
  heads = [
            '🙂', '🥳', '😄', '😁', '😂', '😀', '🙃', '😉', '😊',
            '😇', '🥰', '😍', '🤩', '😘', '😋', '😛', '😜', '🤗',
            '🤫', '🤔', '🤐', '🤨', '😐', '😑', '😶', '😏', '😒',
            '🙄', '😬', '🤕', '🤖', '🤢', '🤧', '🥵', '🥶', '🥴',
            '😵', '🤯', '🤠', '😴', '😎', '🤓', '🧐', '😕', '😟',
            '🙁', '😮', '😯', '😲', '😳', '😱', '😖', '😣', '😞',
            '🥱', '😤', '😠', '🤬', '💀', '💩', '🤡', '👹', '👽'
          ]


  get avatar() {
    return this.me?.avatar || '';
  }

  set avatar(value) {
    if (this.me) {
      this.me = {...this.me, avatar: value || ''};
    }
  }

  get me() {
    return readMe(this.$store);
  }

  set me(value) {
    if (value) {
      dispatchUpdateMe(this.$store, value);
    }
  }
  
}

</script>

<style lang="scss">

.avatar {
  display: flex;
  flex-direction: row;
  max-width: 1160px;
}

.avatar-selection {
  display: flex;
  flex-direction: row;
  overflow: hidden;
}

.avatar-selection .avatar-heads {
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  max-height: 250px;
  overflow: auto;
}

.avatar-selection ul li {
  cursor: pointer;
  margin: 2px;
  list-style: none;
  width: 50px;
  height: 50px;
  text-align: center;
  box-shadow: 0 0 2px #919191;
  background-color: white;
  transition: background-color 0.2s;
}

.avatar-selection ul li span {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 1.4rem;
  background-color: inherit;
  user-select: none; 
}

</style>