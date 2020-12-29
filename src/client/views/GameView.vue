<template>
  <div v-if="currentMatch">
    <c-song-line :line="currentLine"></c-song-line>
  </div>
</template>

<script lang="ts">

import {Component, Vue} from "vue-property-decorator";
import { readCurrentMatch, readError, readMe } from "@/client/store/main/getters";
import { dispatchUpdateMe } from "../store/main/actions";
import { EventMessages } from "@/shared/game/messages";
import CSongLine from '../components/CSongLine.vue';

@Component({
  components: { CSongLine }
})
export default class GameView extends Vue {

  get currentLine() {
    return this.currentMatch?.currentSong?.body.lines[0];
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