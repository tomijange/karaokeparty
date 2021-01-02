<template>
  <div>
    {{ this.started }}
    <div class="game">
      <div ref="wrapper" class="wrapper" v-resize @resize="handleResize">
        <transition name="fade">
          <k-line
            :line="currentLine"
            :config="configKonva"
            :beat="currentBeat"
            :key="currentLine && currentLine.start"
            :pitch="currentPitch"
          >
          </k-line>
        </transition>
        <k-video-player ref="video" @playing="onVideoPlaying" @ended="onVideoEnded" :videoId="videoId"></k-video-player>
      </div>
      <div class="texts">
        <k-line-text
          :line="currentLine"
          :beat="currentBeat"
          :key="currentLine && currentLine.start"
        >
        </k-line-text>
        <k-line-text
          :line="nextLine"
          :beat="currentBeat"
          :key="nextLine && nextLine.start"
          :next="true"
        >
        </k-line-text>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { UltraStarFile, UltraStarLine } from "@/shared/ultrastar-parser/types";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import CButton from "@/client/components/CButton.vue";
import KTimeline from "@/client/components/game/KTimeline.vue";
import KLineText from "@/client/components/game/KLineText.vue";
import KLine from "@/client/components/game/KLine.vue";
import KVideoPlayer from '@/client/components/game/KVideoPlayer.vue';
import { ContainerConfig, Pitch } from "./types";
import PlayerStates from 'youtube-player/dist/constants/PlayerStates';
import pitchAnalyzer from 'pitch-analyser';

@Component({
  components: { CButton, KLineText, KLine, KVideoPlayer },
})
export default class KSong extends Vue {
  @Prop()
  readonly file!: UltraStarFile;

  @Prop()
  readonly started!: boolean;

  configKonva: ContainerConfig | null = null;

  currentBeat?: number = 0;
  currentLine: UltraStarLine | null = null;
  nextLine: UltraStarLine | null = null;
  analyser!: any;
  currentPitch: Pitch | null = null;

  mounted() {
    this.analyser = new pitchAnalyzer({
      callback: this.onPitch
    });
    this.startSong();
  }

  currentLoop?: (frame: number) => void;

  get player() {
    return (this.$refs.video as KVideoPlayer);
  }

  get videoId() {
    return (this as any).$youtube.getIdFromUrl(this.file.header.youtube);
  }

  @Watch('started')
  onStartedChange() {
    if(!this.started){
      this.pauseSong();
    } else {
      this.startSong();
    }
  }

  onVideoEnded() {
    console.log("Finished");
    this.$emit("finished");
  }

  onVideoPlaying() {
    this.$emit("ready");
    if(!this.started) {
      this.pauseSong();
    } else {
      this.startGameLoop();
    }
  }

  pauseSong() {
    this.player.player.pauseVideo();
  }

  async startSong() {
    await this.analyser.initAnalyser();
    await this.analyser.startAnalyser();
    this.player.startVideo();
  }

  onPitch(pitch: Pitch) {
    this.currentPitch = pitch;
  }

  startGameLoop() {
    if (this.currentLoop) {
      return;
    }
    const loop = async (frame: number) => {
      if (await this.player.player.getPlayerState() !== PlayerStates.PLAYING) {
        // wait for playing state
        this.currentLoop = undefined;
        return;
      }
      // for some reason this returns a promise
      const playerTime = await this.player.player.getCurrentTime() * 1000 - this.file.header.gap;
      this.gameLoop(playerTime);
      window.requestAnimationFrame(loop);
    };
    this.currentLoop = loop;
    window.requestAnimationFrame(loop);
  }

  gameLoop(frame: number) {
    // https://www.youtube.com/watch?v=5hFevwJ4JXI
    const bps = (this.file.header.bpm / 60) * 4;
    this.currentBeat = (bps * frame) / 1000;

    let currentLine = null;
    let nextLine = null;
    const lines = this.file.body.lines;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.end! >= this.currentBeat) {
        if (line.start! <= this.currentBeat) {
          currentLine = line;
          nextLine = lines[i + 1];
        } else {
          currentLine = line;
          nextLine = lines[i + 1];
        }
        break;
      }
    }
    this.nextLine = nextLine;
    this.currentLine = currentLine;
  }

  handleResize(event: Event) {
    this.handleWrapper(this.$refs.wrapper as HTMLElement);
  }

  handleWrapper(element: HTMLElement) {
    const { clientHeight: height, clientWidth: width } = this.$refs.wrapper as HTMLElement;
    this.configKonva = { height, width };
  }
}
</script>

<style lang="scss">
.wrapper {
  height: 600px;
  width: 100%;
  position: relative;
  z-index: 1;
}

.game {
  padding: 64px;
}

.texts {
  align-self: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
