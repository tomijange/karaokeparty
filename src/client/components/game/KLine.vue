<template>
  <v-group>
    <v-rect v-for="note in noteConfigs" :key="note.id" :config="note"></v-rect>

    <v-text v-for="text in textConfigs" :key="text.id" :config="text"></v-text>
  </v-group>
</template>

<script lang="ts">
import { UltraStarLine, UltraStarSyllable } from '@/shared/ultrastar-parser/types';
import Konva from 'konva';
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

@Component
export default class KNote extends Vue {

  @Prop()
  line!: UltraStarLine;

  @Prop()
  config!: Konva.ContainerConfig;

  noteConfigs: Konva.RectConfig[] = [];

  textConfigs: Konva.TextConfig[] = [];


  @Watch('config', { immediate: true })
  onConfigChange(newConfig?: Konva.ContainerConfig, oldConfig?: Konva.ContainerConfig) {
    this.calculatePositions();   
  }

  @Watch('line', { immediate: true })
  onLineChange(newLine?: UltraStarLine, oldLine?: UltraStarLine) {
    this.calculatePositions();   
  }

  calculatePositions() {
    if(!this.line || !this.config) {
      return;
    } 

    const { width, height } = this.config;

    const noteConfigs: Konva.RectConfig[] = [];
    const textConfigs: Konva.TextConfig[] = [];

    let lowestPitch = Infinity, highestPitch = -Infinity;

    for(const syllable of this.line.syllables){
      if (syllable.pitch < lowestPitch) {
        lowestPitch = syllable.pitch
      }
      if(syllable.pitch > highestPitch){
        highestPitch = syllable.pitch;
      }
    }

    // in beats
    const lineDuration = this.line.end! - this.line.start!;

    const pitchDiff = highestPitch - lowestPitch;

    const lineHeight = pitchDiff * 40;

    const noteHeight = 40;

    const noteMargin = 4;

    for(const syllable of this.line.syllables) {
      const start = syllable.start - this.line.start!;
      const relativePitch = syllable.pitch - lowestPitch;

      noteConfigs.push({
        x: (start / lineDuration) * width! + noteMargin,
        y: height! / 2 - (relativePitch / pitchDiff * lineHeight) - noteHeight + lineHeight / 2,
        fill: 'rgba(200,122,255,0.4)',
        cornerRadius: 8,
        height: noteHeight,
        width: (syllable.duration / lineDuration) * width! - noteMargin * 2,
        shadowBlur: 8,
      });

      textConfigs.push({
        x: (start / lineDuration) * width! + noteMargin,
        y: height! - 40,
        fill: 'black',
        cornerRadius: 8,
        width: (syllable.duration / lineDuration) * width! - noteMargin * 2,
        shadowBlur: 8,
        text: syllable.text,
        fontFamily: 'Arial',
        fontSize: 16,
        align: 'center',
      });
    }

    this.noteConfigs = noteConfigs;
    this.textConfigs = textConfigs;
  }

}
</script>

<style>

</style>