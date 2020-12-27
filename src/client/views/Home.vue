<template>
  <div class="home">

    <c-card class="welcome-card">
      <h1>Welcome to Karaokeparty🎤</h1>


      <c-button color="#607D8B" class="m-4" @click="onCreateGame">Create Game 🌍</c-button>
    </c-card>

    <c-card class="welcome-card-join">
      <h1>Enter a code</h1>

      <c-code-input></c-code-input>

      <c-button color="#607D8B" class="m-4">Join Game ☝🏼</c-button>
    </c-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
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

  onCreateGame() {
    this.$socket.emit(EventMessages.CreateMatch);
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
.home {
  background: radial-gradient(#ffffff, #eeeeee);
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 64px;
}

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

.avatar-card {
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar-card ul {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.welcome-card-join button {
  width: fit-content;
}

</style>
