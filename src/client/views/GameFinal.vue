<template>
  <div class="game-final">
    <c-card v-if="error">
      {{ error }}
    </c-card>
    <c-card v-if="currentMatch" class="flex">
      <h2>Ende</h2>
      <c-button @click="onRestart" v-if="isLeader && !nextGameId">Neues Spiel</c-button>
      <c-button @click="onJoinNext" v-else-if="nextGameId">Neues Spiel beitreten</c-button>
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
  
  get nextGameId() {
    return this.currentMatch?.nextGameId;
  }

  onJoinNext() {
    this.$socket.emit(EventMessages.JoinMatch, this.nextGameId);
  }

  onRestart() {
    this.$socket.emit(EventMessages.RestartLobby, '');
  }

  get sortedUsers() {
    return this.currentMatch?.users.sort((user1, user2) => user2.score - user1.score);
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

.game-final {
  margin: 0 auto;
  max-width: 800px;
}
</style>
