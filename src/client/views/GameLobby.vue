<template>
  <div class="game-lobby">
    <c-card v-if="currentMatch">
      <h2>Die Lobby</h2>
      <c-text-input id="textInput1" label-text="Username" class="username-input m-4" autocomplete="off"></c-text-input>

      <c-card class="avatar-card">
        <h2>Select your Avatar 🥳</h2>
        <c-avatar-selection></c-avatar-selection>
      </c-card>
      <c-text-input id="textInput1" label-text="Username" class="username-input m-4" v-model="name"></c-text-input>

      <ul>
        <li v-for="user in currentMatch.users" :key="user.userId">{{user.name}}</li>
      </ul>

    </c-card>
  </div>
</template>


<script lang="ts">

import { Component, Vue } from "vue-property-decorator";
import { readCurrentMatch, readMe } from "@/client/store/main/getters";
import { EventMessages } from "@/shared/game/messages";
import CCard from "@/client/components/CCard.vue";
import CTextInput from "@/client/components/CTextInput.vue";
import CAvatarSelection from "@/client/components/CAvatarSelection.vue";
import { commitSetMe } from "@/client/store/main/mutations";
import { debounce } from 'underscore';


@Component({
  components: { CAvatarSelection, CTextInput, CCard }
})
export default class GameLobby extends Vue {

  mounted() {
    const gameId = this.$route.params.gameId;
    if (!this.currentMatch) {
      this.$socket.emit(EventMessages.JoinMatch, gameId);
    }
  }

  get currentMatch() {
    return readCurrentMatch(this.$store);
  }

  get name() {
    return this.me?.name;
  }

  set name(value) {
    if (this.me) {
      this.me = {...this.me, name: value || ''};
    }
  }

  get me() {
    return readMe(this.$store);
  }

  set me(value) {
    commitSetMe(this.$store, value);
    debounce(() => this.$socket.emit(EventMessages.UpdateMe, value), 100)();
  }

}

</script>

<style lang="scss">

.game-lobby {
  background: radial-gradient(#ffffff, #eeeeee);
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 64px;
}

.avatar-card {
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.avatar-card ul {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}


</style>
