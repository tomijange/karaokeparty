<template>
  <div class="game-lobby">
    <c-card v-if="error">
      {{ error }}
    </c-card>

    <c-card class="ma-2 d-flex">
      <div class="flex">
        <h2>Die Lobby</h2>
        <div class="start" v-if="isLeader">
          <c-button color="#607D8B" class="ma-4" @click="startGame" :disabled="!currentSongId">Start 🎤</c-button>
        </div>
      </div>
      <div class="flex">
        <h2>Songliste</h2>
        <c-song-list v-if="songs">
          <c-song-list-item 
            v-for="song in songs" 
            :key="song.id" 
            :selected="currentSongId === song.id"
            @click="setSong(song.id)"
            :file="song">
          </c-song-list-item>
        </c-song-list>
      </div>
    </c-card>
    <div class="d-flex mt-10 flex-wrap">
      <c-card class="ma-2 flex-shrink">
        <h2>Mikrofon testen 🎤</h2>
        <div class="microphone-test-body">
          <p>
            Teste dein Mikrofon, bevor du lossingst.
          </p>
          <c-button class="mb-2" color="#fb0fff" @click="activateMicrophone" :disabled="!!analyser">Aktivieren 🎤</c-button>
          <h3>
            {{ currentPitch && currentPitch.note || '--' }}
          </h3>
        </div>
      </c-card>

      <c-card v-if="currentMatch" class="flex ma-2">
      <div class="d-flex">
        <div class="flex ma-2">
          <h2>Die Lobby</h2>
          <c-text-input id="textInput1" label-text="Username" class="username-input ma-3" v-model="name"></c-text-input>
          <c-user-list>
            <c-user-list-item v-for="user in currentMatch.users" :key="user.userId" :user="user"></c-user-list-item>
          </c-user-list>
        </div>
        <div class="flex ma-2">
          <h2>Avatar aussuchen</h2>
          <c-avatar-selection></c-avatar-selection>
        </div>
      </div>
    </c-card>
    </div>

  </div>
</template>


<script lang="ts">

import { Component, Vue } from "vue-property-decorator";
import { readCurrentMatch, readError, readMe, readSongs } from "@/client/store/main/getters";
import { EventMessages } from "@/shared/game/messages";
import CCard from "@/client/components/CCard.vue";
import CTextInput from "@/client/components/CTextInput.vue";
import CAvatarSelection from "@/client/components/CAvatarSelection.vue";
import CUserListItem from '@/client/components/CUserListItem.vue';
import CUserList from '@/client/components/CUserList.vue';
import CSongListItem from '@/client/components/songs/CSongListItem.vue';
import CSongList from '@/client/components/songs/CSongList.vue';
import CButton from "@/client/components/CButton.vue";
import { dispatchGetSongs, dispatchUpdateMe } from "../store/main/actions";
import PitchAnalyser, { Pitch } from "../pitch-analyser";
import { UltraStarFile } from "@/shared/ultrastar-parser/types";


@Component({
  components: {CButton, CAvatarSelection, CTextInput, CCard, CUserListItem, CUserList, CSongList, CSongListItem }
})
export default class GameLobby extends Vue {
  analyser: PitchAnalyser | null = null;
  currentPitch: Pitch | null = null;

  async mounted() {
    const gameId = this.$route.params.gameId;
    if (!this.currentMatch) {
      this.$socket.emit(EventMessages.JoinMatch, gameId);
    }

    dispatchGetSongs(this.$store);
  }

  get songs() {
    return readSongs(this.$store) || null;
  }

  async activateMicrophone() {
    this.analyser = new PitchAnalyser({
      callback: this.onPitch,
    });
    await this.analyser?.initAnalyser();
    await this.analyser?.startAnalyser();
  }

  destroyed() {
    this.analyser?.stopAnalyser();
  }


  onPitch(pitch: Pitch) {
    this.currentPitch = pitch;
  }

  setSong(id: string | number) {
    this.$socket.emit(EventMessages.SetSong, id);
  }

  startGame() {
    this.$socket.emit(EventMessages.StartMatch, '');
  }

  get currentSongId() {
    return this.currentMatch?.currentSong?.id || null;
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

  get name() {
    return this.me?.name || '';
  }

  set name(value) {
    if (!value) {
      return;
    }
    value = value.replace(/\W/g, '');

    if (this.me) {
      this.me = {...this.me, name: value || ''};
    }
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

.game-lobby {
  margin: 0 auto;
  max-width: 1200px;
}

.microphone-test-body {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 100%;
}
</style>
