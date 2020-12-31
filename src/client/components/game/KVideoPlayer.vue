<template>
  <div class="video-wrapper">
    <youtube 
      :video-id="videoId" 
      ref="youtube" 
      @playing="onPlaying"
      width="100%"
      height="100%"
    ></youtube>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: {  },
})
export default class KVideoPlayer extends Vue {

  videoId = 'dQw4w9WgXcQ';

  get player() {
    return (this.$refs.youtube as any).player;
  }

  onPlaying(e: Event) {
    console.log("playing");
    this.$emit('playing', e);
  }

  public startVideo() {
    this.player.playVideo();
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
