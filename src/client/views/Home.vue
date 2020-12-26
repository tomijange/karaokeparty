<template>
  <div class="home">

    <c-card class="welcome-card">
      <h1>Welcome to Karaokeparty🎤</h1>

      <c-text-input id="textInput1" label-text="Username" class="username-input ma-4"></c-text-input>

      <c-button color="#607D8B" class="ma-4" @click="onCreateGame">Create Game 🌍</c-button>
    </c-card>


  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CButton from "@/client/components/CButton.vue";
import CTextInput from "@/client/components/CTextInput.vue";
import CCard from "@/client/components/CCard.vue";

@Component({
  components: { CCard, CTextInput, CButton },
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

.welcome-card {
  margin: 0 auto;
  max-width: 800px;
}

</style>
