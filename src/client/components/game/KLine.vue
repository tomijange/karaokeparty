<template>
  <div>
    <div 
      v-for="note in noteConfigs" 
      :key="note.id"
      :style="{
        top: note.y + 'px',
        left: note.x + 'px',
        width: note.width + 'px',
        height: note.height + 'px',
      }"
      :class="{
        note: true,
        'note-active': note.active,
      }"
    >
      <div class="progress" :style="{
          width: note.progressWidth + 'px',
        }">

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { UltraStarLine, UltraStarSyllable } from '@/shared/ultrastar-parser/types';
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { ContainerConfig, SyllablePillConfig } from './types';

@Component
export default class KNote extends Vue {

  @Prop()
  readonly line!: UltraStarLine;

  @Prop()
  readonly config!: ContainerConfig;

  @Prop()
  readonly beat!: number;

  noteConfigs: SyllablePillConfig[] = [];

  textConfigs: ContainerConfig[] = [];


  @Watch('config', { immediate: true })
  onConfigChange(newConfig?: ContainerConfig, oldConfig?: ContainerConfig) {
    this.calculatePositions();   
  }

  @Watch('line', { immediate: true })
  onLineChange(newLine?: UltraStarLine, oldLine?: UltraStarLine) {
    this.calculatePositions();   
  }

  @Watch('beat', {immediate: true})
  onBeatChange(newBeat?: number, oldBeat?: number) {
    this.calculatePositions();
  }

  calculatePositions() {
    if(!this.line || !this.config) {
      this.noteConfigs = [];
      this.textConfigs = [];
      return;
    } 

    const { width, height } = this.config;

    const noteConfigs: SyllablePillConfig[] = [];
    const textConfigs: ContainerConfig[] = [];

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

    const noteHeight = 20;
    const noteMargin = 4;

    for(const syllable of this.line.syllables) {
      const start = syllable.start - this.line.start!;
      const relativePitch = syllable.pitch - lowestPitch;
      const currentNote = syllable.start <= this.beat && (syllable.start + syllable.duration) >= this.beat;
      const noteWidth = (syllable.duration / lineDuration) * width! - noteMargin * 2;
      let progressWidth = 0;
      if (currentNote) {
        progressWidth = (this.beat - syllable.start) / syllable.duration * noteWidth;
      } else if(syllable.start < this.beat){
        progressWidth = noteWidth;
      }

      noteConfigs.push({
        x: (start / lineDuration) * width! + noteMargin,
        y: height! / 2 - (relativePitch / pitchDiff * lineHeight) - noteHeight + lineHeight / 2,
        height: noteHeight,
        width: noteWidth,
        type: 'normal', 
        active: currentNote,
        id: syllable.start,
        progressWidth,
      });
    }

    this.noteConfigs = noteConfigs;
    this.textConfigs = textConfigs;
  }

}
</script>

<style lang="scss" scoped>

.note {
  --color: rgba(122,122,200, 0.5);

  position: absolute;
  background-color: rgba(255,255,255, 0.5);
  border-radius: 8px;
  transition-duration: .2s;
  transition-property: box-shadow,background-color,transform;
  box-shadow: 1px 1px 5px 1px var(--color);
  transform: scale(1);

  &.note-active {
    --color: rgba(122,200,255, 1);
    box-shadow: 1px 1px 8px 2px var(--color);
    transform: scale(1.1);
  }
  .progress {
    background-color: rgba(122,200,255, 1);
    width: 0;
    height: 100%;
    transition: width .1s;
    border-radius: 8px;
  }
}

</style>