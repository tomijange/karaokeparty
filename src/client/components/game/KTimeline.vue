<template>
  <v-group>
    <v-rect :config="config"></v-rect>

    <v-rect :config="timeline" ref="rect"></v-rect>
  </v-group>
</template>

<script lang="ts">
import { UltraStarHeader, UltraStarSyllable } from '@/shared/ultrastar-parser/types';
import Konva from 'konva';
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

@Component
export default class KTimeline extends Vue {

  anim!: Konva.Animation;

  timeline: Konva.RectConfig = {
    stroke: 'red',
    strokeWidth: 1,
  };

  @Prop()
  header!: UltraStarHeader;


  startTimeline() {
    //https://www.youtube.com/watch?v=esg3OCcgwjM
    const lineNode: Konva.Rect = (this.$refs.rect as any).getNode();
    this.anim = new Konva.Animation((frame) => {

      const width = (frame!.time / 1000 / 60) * this.config!.width!;
      lineNode.setAttrs({ width })
      
    }, lineNode.getLayer());

    this.anim.start();
  }

  @Prop()
  config!: Konva.RectConfig;

  @Watch('config', {immediate: true})
  onConfigChange(newConfig?: Konva.RectConfig, oldConfig?: Konva.RectConfig) {
    if(!newConfig) {
      return;
    }
    this.timeline = {
      ...this.timeline,
      x: newConfig.x,
      y: newConfig.y,
      height: newConfig.height,
      width: 0,
      fill: 'red',
    };
  }
}
</script>

<style>

</style>