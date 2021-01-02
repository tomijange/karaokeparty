<template>
  <div>
    <k-song 
      v-if="currentMatch" 
      :file="currentSong" 
      :started="started" 
      @ready="onPlayerReady"
      @finished="onPlayerFinished"  
    >
    </k-song>
    <div v-if="currentMatch">
    <c-user-list>
      <c-user-list-item v-for="user in currentMatch.users" :key="user.userId" :user="user"></c-user-list-item>
    </c-user-list>
    </div>
  </div>
</template>

<script lang="ts">

import {Component, Vue} from "vue-property-decorator";
import { readCurrentMatch, readError, readMe } from "@/client/store/main/getters";
import { dispatchUpdateMe } from "../store/main/actions";
import { EventMessages } from "@/shared/game/messages";
import KSong from '../components/game/KSong.vue';
import CUserListItem from '@/client/components/CUserListItem.vue';
import CUserList from '@/client/components/CUserList.vue';


@Component({
  components: { KSong, CUserListItem, CUserList }
})
export default class GameView extends Vue {

  get currentSong() {
    return this.currentMatch?.currentSong;
  }

  get started() {
    return this.currentMatch?.playerState === 'ready';
  }

  onPlayerFinished() {
    if (this.me) {
      this.me = { ...this.me, playerState: 'finished' };
    }
  }

  onPlayerReady() {
    if (this.me) {
      this.me = { ...this.me, playerState: 'ready' };
    }
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
