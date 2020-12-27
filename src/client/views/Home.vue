<template>
  <div class="home">

    <c-card class="welcome-card">
      <h1>Welcome to Karaokeparty🎤</h1>

      <c-text-input id="textInput1" label-text="Username" class="username-input ma-4"></c-text-input>

      <c-button color="#607D8B" class="ma-4" @click="onCreateGame">Create Game 🌍</c-button>
    </c-card>

    <c-card class="welcome-card-join">
      <h1>Enter a code</h1>

      <c-code-input></c-code-input>

      <c-button color="#607D8B" class="ma-4">Join Game ☝🏼</c-button>
    </c-card>

    <c-card class="avatar-card">
      <c-avatar-selection></c-avatar-selection>
    </c-card>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CButton from "@/client/components/CButton.vue";
import CTextInput from "@/client/components/CTextInput.vue";
import CCard from "@/client/components/CCard.vue";
import CCodeInput from "@/client/components/CCodeInput.vue";
import CAvatarSelection from "@/client/components/CAvatarSelection.vue";

@Component({
  components: { CAvatarSelection, CCodeInput, CCard, CTextInput, CButton },
})
export default class Home extends Vue {

  onCreateGame() {
    this.$router.push('game-lobby');
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
