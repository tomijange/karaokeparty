<template>
  <div ref="wrapper" class="wrapper">
    <c-button @click="startSong">Start</c-button>

    <v-stage :config="configKonva">
      <v-layer>
        <v-group>
          <v-line v-for="line in linesConfigs" :key="line.id" :config="line"></v-line>
        </v-group>
        <v-group>
          <k-line :line="currentLine" :config="configKonva"></k-line>
        </v-group>
        <v-group>
          <k-timeline :config="timelineConfig" ref="timeline" :header="file.header"></k-timeline>
        </v-group>
      </v-layer>
    </v-stage>
    {{ this.currentBeat }}
    {{ this.currentLine }}
  </div>
</template>

<script lang="ts">
import { UltraStarFile, UltraStarLine } from "@/shared/ultrastar-parser/types";
import { Component, Prop, Vue } from "vue-property-decorator";
import CButton from "@/client/components/CButton.vue";
import KTimeline from "@/client/components/game/KTimeline.vue";
import KLine from '@/client/components/game/KLine.vue';
import Konva from "konva";


@Component({
  components: { CButton, KTimeline, KLine }
})
export default class KSong extends Vue {

  @Prop()
  readonly file!: UltraStarFile;

  configKonva: Konva.ContainerConfig = {};

  linesConfigs: Konva.LineConfig[] = [];

  noteConfigs: Konva.RectConfig[] = [];

  timelineConfig: Konva.RectConfig = {};

  currentBeat?: number = 0;

  currentLine: UltraStarLine | null = null;

  startSong() {
    (this.$refs.timeline as KTimeline).startTimeline();

    const anim = new Konva.Animation((frame) => {
      // https://www.youtube.com/watch?v=5hFevwJ4JXI
      const bps = this.file.header.bpm / 60 * 4;
      this.currentBeat = Math.floor(bps * frame!.time / 1000);
      for(const line of this.file.body.lines) {
        if (line.start! <= this.currentBeat && line.end ? line.end >= this.currentBeat : true) {
          this.currentLine = line;
          break;
        }
      }
    });
    anim.start();
  }

  mounted() {
    const { clientHeight: height, clientWidth: width } = this.$refs.wrapper as HTMLElement;
    this.configKonva = { height, width };


    for(let i = 0 ; i < 10; i++) {
      this.linesConfigs.push({
        id: '' + i,
        points: [0, i * (height / 10), width, i * (height / 10)],
        stroke: 'rgba(0,0,0,0.4)',
        strokeWidth: 1
      });
    }

    this.timelineConfig = {
      x: 0,
      y: height-10,
      width: width,
      height: 10,
      stroke: 'black',
      strokeWidth: 1,
    }
  }

}
</script>

<style>

.wrapper{
  height: 600px;
  width: 100%;
}

</style>
