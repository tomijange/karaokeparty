<template>
  <div class="video-wrapper">
    <youtube 
      :video-id="videoId" 
      ref="youtube" 
      v-on="$listeners"
      width="100%"
      height="100%"
    ></youtube>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import PlayerStates from "youtube-player/dist/constants/PlayerStates";
import { YouTubePlayer } from 'youtube-player/dist/types';

@Component({
  components: {  },
})
export default class KVideoPlayer extends Vue {

  @Prop({ required: true })
  readonly videoId!: string;

  get player() {
    return (this.$refs.youtube as any).player as YouTubePlayer;
  }


  public async startVideo() {
    const playerState = await this.player.getPlayerState();
    if (playerState == PlayerStates.PAUSED) {
      this.player.playVideo();
      return;
    }
    this.player.seekTo(0, true);
    this.player.playVideoAt(0);
  }

}
</script>

<style lang="scss">

.video-wrapper {
  user-select: none;
  pointer-events: none;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  z-index: -1;
  filter: brightness(.5);
}

</style>
