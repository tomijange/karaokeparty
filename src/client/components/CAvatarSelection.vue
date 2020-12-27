<template>
  <div class="avatar pa-4">
    <div class="avatar-selection m-2">

      <div class="custom-avatar p-2">
        <input type="text" placeholder="Optionally enter a custom valid emoji as head" title="https://emojiterra.com/de/liste/ (First 7 lines)" maxlength="2"
               @input="onCustomHeadInput">

        <c-avatar-parts
            :avatar-parts="this.customHead"
            v-model="selectedHead">
        </c-avatar-parts>
      </div>

      <c-avatar-parts
          :avatar-parts="this.heads"
          v-model="selectedHead">
      </c-avatar-parts>

      <c-avatar-parts
          :avatar-parts="this.bodies"
          v-model="selectedBody">
      </c-avatar-parts>

    </div>

    <div class="final-avatar m-2">
      <ul>
        <li><span>{{ selectedHead }}  {{ selectedBody }} </span></li>
      </ul>
    </div>

  </div>
</template>

<script>

import {Component, Vue} from "vue-property-decorator";
import CAvatarParts from "@/client/components/CAvatarParts";

@Component({
  components: {CAvatarParts}
})

export default class CAvatar extends Vue {
  customHead = ['💀'];
  heads = ['🙂', '😉', '😲', '😄', '🥴', '🥰', '🤨', '😮', '👀'];
  bodies = ['👔', '🩱', '🥼', '👗', '👕', '🦺', '👘', '🧥', '👚'];
  selectedHead = '🙂';
  selectedBody = '👔';
  validEmojis = ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇', '🥰', '😍', '🤩',
                 '😘', '😗', '😚', '😙', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨',
                 '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '🤥', '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤖' ,
                 '🤢', '🤮', '🤧', '🥵', '🥶', '🥴', '😵', '🤯', '🤠', '🥳', '😎', '🤓', '🧐', '😕', '😟', '🙁',
                 '☹️', '😮', '😯', '😲', '😳', '🥺', '😦', '😧', '😨', '😰', '😥', '😢', '😭', '😱', '😖', '😣',
                 '😞', '😓', '😩', '😫', '🥱', '😤', '😡', '😠', '🤬', '😈', '👿', '💀', '☠️', '💩',
                 '🤡', '👹', '👽']
  //  https://emojiterra.com/de/liste/

  onCustomHeadInput(e) {
    if (this.isValidEmoji(e.target.value))
    this.customHead = [e.target.value];
  }
  isValidEmoji(value) {
    if (value.length > 0)
      for (let i = 0; i < this.validEmojis.length; i++) if (value === this.validEmojis[i]) return true;
    return false;
  }
}

</script>

<style lang="scss">

.avatar {
  box-shadow: 0 0 10px #919191;
  display: flex;
  flex-direction: row;
}

.avatar-selection, .final-avatar ul {
  display: flex;
  flex-direction: column;
}

.avatar-selection ul, .final-avatar ul {
  padding: 0;
  margin: 0;
}

.avatar-selection li, .final-avatar li {
  cursor: pointer;
  margin: 2px;
  list-style: none;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  text-align: center;
  box-shadow: 0 0 2px #919191;
  background-color: white;
  transition: background-color 0.2s;
}

.final-avatar li {
  cursor: default;
  height: 158px;
  display: flex;
  flex-direction: column;
}

.avatar-selection li span, .final-avatar li span {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 1.4rem;
  background-color: inherit;
  user-select: none;
}

.final-avatar li span {
  font-size: 1.6rem;
}

.custom-avatar {
  position: relative;
  display: flex;
  flex-direction: row;
  height: 50px;
}

.custom-avatar input {
  position: relative;
  margin: 2px;
  padding: 0;
  outline: none;
  border: none;
  font-size: 1rem;
  background-color: inherit;
  width: 250%;

}
.custom-avatar li {
  position: absolute;
  right: 0;
  top: 0;
}

</style>