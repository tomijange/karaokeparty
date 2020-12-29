<template>
  <div class="home">

    <c-card class="welcome-card">
      <h1>Welcome to Karaokeparty🎤</h1>


      <c-button color="#607D8B" class="m-4" @click="onCreateGame">Create Game 🌍</c-button>
    </c-card>

    <c-card class="welcome-card-join">
      <h1>Enter a code</h1>

      <div class="code-input-button">
        <c-button color="#607D8B" class="d-flex ma-2" v-model="gameID" @click="onJoinGame">Join Game <p class="finger">👉</p></c-button>
        <c-code-input class="ma-2"></c-code-input>

      </div>
    </c-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import CButton from "@/client/components/CButton.vue";
import CTextInput from "@/client/components/CTextInput.vue";
import CCard from "@/client/components/CCard.vue";
import CCodeInput from "@/client/components/CCodeInput.vue";
import { EventMessages } from "@/shared/game/messages";
import { readError, readMe } from "@/client/store/main/getters";

@Component({
  components: { CCodeInput, CCard, CTextInput, CButton },
})
export default class Home extends Vue {

  gameID = '';

  onCreateGame() {
    this.$socket.emit(EventMessages.CreateMatch);
  }

  onJoinGame() {
    // Join match with game-id of this.gameID
  }

  get error() {
    return readError(this.$store);
  }

  get me() {
    return readMe(this.$store);
  }
}
</script>

<style lang="scss">

.username-input label {
  background-color: #919191;
  color: #fff;
}

.welcome-card, .welcome-card-join, .avatar-card {
  margin: 0 auto;
  max-width: 800px;
}

.welcome-card-join {
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
}

.welcome-card-join button {
  width: fit-content;
}

.code-input-button {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
}

.finger {
  margin: -5px -10px 0 3px;
}

</style>
