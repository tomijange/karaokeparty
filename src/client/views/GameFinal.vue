<template>
  <div class="game-lobby">
    <c-card v-if="error">
      {{ error }}
    </c-card>
    <c-card v-if="currentMatch" class="flex">
      <h2>Ende</h2>
    </c-card>

    <c-card v-if="currentMatch" class="mt-10">
      <h2>Die Lobby</h2>
      <c-user-list v-if="sortedUsers">
        <c-user-list-item 
          v-for="user in sortedUsers" 
          :key="user.userId" 
          :user="user">
        </c-user-list-item>
      </c-user-list>
    </c-card>
  </div>
</template>


<script lang="ts">

import { Component, Vue } from "vue-property-decorator";
import { readCurrentMatch, readError, readMe } from "@/client/store/main/getters";
import { EventMessages } from "@/shared/game/messages";
import CCard from "@/client/components/CCard.vue";
import CTextInput from "@/client/components/CTextInput.vue";
import CAvatarSelection from "@/client/components/CAvatarSelection.vue";
import CUserListItem from '@/client/components/CUserListItem.vue';
import CUserList from '@/client/components/CUserList.vue';
import CButton from "@/client/components/CButton.vue";
import { dispatchUpdateMe } from "../store/main/actions";


@Component({
  components: {CButton, CAvatarSelection, CTextInput, CCard, CUserListItem, CUserList }
})
export default class GameFinal extends Vue {

  mounted() {
    const gameId = this.$route.params.gameId;
    if (!this.currentMatch) {
      this.$socket.emit(EventMessages.JoinMatch, gameId);
    }
  }

  get sortedUsers() {
    return this.currentMatch?.users.sort((user1, user2) => user2.score - user1.score);
  }

  startGame() {
    this.$socket.emit(EventMessages.StartMatch, '');
  }

  get error() {
    return readError(this.$store);
  }

  get currentMatch() {
    return readCurrentMatch(this.$store);
  }

  get isLeader() {
    return this.me?.type === 'leader';
  }

  get name() {
    return this.me?.name || '';
  }

  set name(value) {
    if (!value) {
      return;
    }
    value = value.replace(/\W/g, '');

    if (this.me) {
      this.me = {...this.me, name: value || ''};
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

.game-lobby {
  margin: 0 auto;
  max-width: 800px;
}
</style>
