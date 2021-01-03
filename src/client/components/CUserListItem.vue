<template>
  <li class="user-list-item ma-2">
    <div class="user-avatar mr-2">{{ user.avatar }}</div>
    <div class="flex d-flex">
      <div class="user-name">{{ user.name }}</div>
      <div class="user-score" v-if="user.score">{{ user.score }}</div>
    </div>
    <div>{{ user.type === 'leader' ? ' 👑' : ''}}</div>
  </li>
</template>

<script lang="ts">

import { User } from "@/shared/game/types";
import {Component, Prop, Vue} from "vue-property-decorator";

@Component({})
export default class CUserListItem extends Vue {

  @Prop()
  readonly user!: User;

}

</script>

<style scoped lang="scss">

.user-list-item {
  display: flex;
  color: white;
  background: linear-gradient(90deg,rgba(74, 151, 1, 0.8), rgba(209, 179, 11, 0.8));
  border-radius: 2px;
  padding: 2px 8px;
  font-size: 1.2rem;
}

.user-score {
  margin: 0 8px;
}


</style>
