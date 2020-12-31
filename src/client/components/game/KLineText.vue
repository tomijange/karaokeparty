<template>
  <div v-bind="$attrs" :class="{
      'line': true,
      'next-line': next
    }">
    <span 
      :class="{
        'syllable': true,
        'syllable-active': text.active  
      }"
      v-for="text in textConfigs" 
      :key="text.id"
      v-text="text.text"
    ></span>
  </div>
</template>

<script lang="ts">
import { UltraStarLine, UltraStarSyllable } from '@/shared/ultrastar-parser/types';
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { ContainerConfig, SyllablePillConfig, TextConfig } from './types';

@Component
export default class KSongText extends Vue {

  @Prop()
  readonly line!: UltraStarLine;

  @Prop()
  readonly beat!: number;

  @Prop({default: false})
  readonly next!: boolean;

  textConfigs: TextConfig[] = [];

  @Watch('line', { immediate: true })
  onLineChange(newLine?: UltraStarLine, oldLine?: UltraStarLine) {
    this.calculatePositions();   
  }

  @Watch('beat', {immediate: true})
  onBeatChange(newBeat?: number, oldBeat?: number) {
    this.calculatePositions();
  }

  calculatePositions() {
    if(!this.line) {
      return;
    } 


    let lowestPitch = Infinity, highestPitch = -Infinity;

    for(const syllable of this.line.syllables){
      if (syllable.pitch < lowestPitch) {
        lowestPitch = syllable.pitch
      }
      if(syllable.pitch > highestPitch){
        highestPitch = syllable.pitch;
      }
    }

    const texts: TextConfig[] = [];

    for(const syllable of this.line.syllables) {
      const start = syllable.start - this.line.start!;
      const relativePitch = syllable.pitch - lowestPitch;
      const currentNote = syllable.start <= this.beat && (syllable.start + syllable.duration) >= this.beat;
      let progressWidth = 0;
      if (currentNote) {
        progressWidth = (this.beat - syllable.start) / syllable.duration;
      } else if(syllable.start < this.beat){
        progressWidth = 1;
      }
      texts.push({
        text: syllable.text,
        active: currentNote,
        id: syllable.start,
      });
    }

    this.textConfigs = texts;
  }

}
</script>

<style lang="scss" scoped>

.line {
  text-align: center;
  font-size: 1.7rem;

  &.next-line {
    font-size: 1.5rem;
  }
}

.syllable {
  letter-spacing: 1.2px;
  white-space: pre;
  display: inline-block;
  transition-property: transform, color;
  transition-duration: .2s;
  transform: scale(1);
  opacity: .7;
  color: grey;

  &.syllable-active {
    transform: scale(1.2);
    opacity: 1;
    color: rgba(122,200,255, 1);
  }
}

</style>