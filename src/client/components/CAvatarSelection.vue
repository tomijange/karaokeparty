<template>
  <div class="avatar pa-4">

    <div class="avatar-selection">

      <c-avatar-parts
          :avatar-parts="this.heads"
          v-model="selectedHead">
      </c-avatar-parts>

      <c-avatar-parts
          :avatar-parts="this.bodies"
          v-model="selectedBody">
      </c-avatar-parts>

    </div>

    <div class="final-avatar ml-15">
      <ul>
        <li>  <span>{{ selectedHead }}  {{ selectedBody }}  </span>  </li>
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
  heads = ['🙂', '😉', '😲', '😄', '🥴', '🥰'];
  bodies = ['👔', '🩱', '🥼', '👗', '👕', '🦺'];
  selectedHead = '🙂';
  selectedBody = '👔';
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
  height: 104px;
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

</style>