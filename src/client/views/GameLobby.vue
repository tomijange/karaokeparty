<template>
  <div class="game-lobby">
    <c-card>
      <h2>Die Lobby</h2>
      <c-text-input id="textInput1" label-text="Username" class="username-input m-4"></c-text-input>

    </c-card>
  </div>
</template>


<script lang="ts">

import { Component, Vue } from "vue-property-decorator";
import { readCurrentMatch, readMe } from "@/client/store/main/getters";
import { EventMessages } from "@/shared/game/messages";
import CCard from "@/client/components/CCard.vue";
import CTextInput from "@/client/components/CTextInput.vue";

@Component({
  components: { CTextInput, CCard }
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

  get me() {
    return readMe(this.$store);
  }

}

</script>

<style scoped lang="scss">

.game-lobby {
  background: radial-gradient(#ffffff, #eeeeee);
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 64px;

}

</style>
