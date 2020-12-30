<template>
  <k-song v-if="currentMatch" :file="currentSong"></k-song>
</template>

<script lang="ts">

import {Component, Vue} from "vue-property-decorator";
import { readCurrentMatch, readError, readMe } from "@/client/store/main/getters";
import { dispatchUpdateMe } from "../store/main/actions";
import { EventMessages } from "@/shared/game/messages";
import KSong from '../components/game/KSong.vue';

@Component({
  components: { KSong }
})
export default class GameView extends Vue {

  get currentSong() {
    return this.currentMatch?.currentSong;
  }
  

  mounted() {
    const gameId = this.$route.params.gameId;
    if (!this.currentMatch) {
      this.$socket.emit(EventMessages.JoinMatch, gameId);
    }
  }

  get error() {
    return readError(this.$store);
  }

  get currentMatch() {
    return readCurrentMatch(this.$store);
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

<style lang="scss" scoped>

</style>
