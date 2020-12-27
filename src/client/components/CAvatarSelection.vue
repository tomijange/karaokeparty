<template>
  <div class="avatar pa-4">

    <c-avatar-parts :avatar-parts="this.heads" v-model="selectedHead"></c-avatar-parts>

    <c-avatar-parts :avatar-parts="this.bodies" v-model="selectedBody"></c-avatar-parts>

    <ul>
      <li>{{ selectedHead }}</li>
    </ul>
    <ul>
      <li>{{ selectedBody }}</li>
    </ul>

  </div>
</template>

<script>

import {Component, Vue} from "vue-property-decorator";
import CAvatarParts from "@/client/components/CAvatarParts";

@Component({
  components: {CAvatarParts}
})

export default class CAvatar extends Vue {
  heads = ['🙂', '😉', '😲', '😄', '🥴'];
  bodies = ['👔', '🩱', '🥼', '👗', '👕'];
  selectedHead = '🙂';
  selectedBody = '👔';
}

</script>

<style lang="scss">

.avatar {
  box-shadow: 0 0 10px #919191;
}
.avatar ul {
  padding: 0;
  margin: 0;
}
.avatar li {
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
.avatar li span {
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