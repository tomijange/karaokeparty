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
    </div>
    <div 
      v-for="pitch in sungPitches" 
      :key="pitch.id"
      :style="{
        top: pitch.y + 'px',
        left: pitch.x + 'px',
        width: pitch.width + 'px',
        height: pitch.height + 'px',
      }"
      :class="{
        pitch: true,
        hits: pitch.hittingNote,
      }"
    >
    </div>
  </div>
</template>

<script lang="ts">
import { UltraStarLine, UltraStarSyllable } from '@/shared/ultrastar-parser/types';
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { ContainerConfig, SungPitch, SyllablePillConfig } from './types';
import { frequencyToPitch } from './helpers';
import { Pitch } from '@/client/pitch-analyser';
import { logError } from '@/client/pitch-analyser/helpers';

@Component
export default class KNote extends Vue {

  @Prop()
  readonly line!: UltraStarLine;

  @Prop()
  readonly config!: ContainerConfig;

  @Prop()
  readonly beat!: number;

  @Prop()
  readonly pitch!: Pitch | null;

  @Prop({default: 24})
  readonly padding!: number;

  @Prop({default: 1})
  readonly maxPitchDiff!: number;

  noteConfigs: SyllablePillConfig[] = [];

  textConfigs: ContainerConfig[] = [];

  sungPitches: SungPitch[] = [];


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
    this.calculatePositions(newBeat, oldBeat);
  }

  @Watch('pitch')
  onPitchChange(newPitch?: Pitch, oldPitch?: Pitch) {
    if(newPitch?.frequency !== oldPitch?.frequency){
      this.calculatePositions();
    }
  }


  calculatePositions(newBeat?: number, oldBeat?: number) {

    const precission = 1;
    // number of beats (with milli) with the old sung note ends
    // and the new begins
    const roundedBeat = +this.beat.toFixed(precission);
    const oldRoundedBeat = oldBeat && +oldBeat.toFixed(precission);

    if (roundedBeat === oldRoundedBeat) {
      // limit rerenders
      return;
    }

    if(!this.line || !this.config) {
      this.noteConfigs = [];
      this.textConfigs = [];
      return;
    } 

    const width = this.config.width - this.padding * 2;
    const height = this.config.height - this.padding * 2;

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
    lowestPitch -= 5;
    highestPitch += 5;

    const lineEnd = this.line.syllableEnd!;
    const lineStart = this.line.syllableStart!;

    // in beats
    const lineDuration = lineEnd - lineStart;
    const pitchDiff = Math.max(highestPitch - lowestPitch, 12);

    const lineHeight = height;

    const noteHeight = 14;


    const create = <T extends ContainerConfig>(config: T, options: { start?: number; end?: number; relativePitch?: number; margin?: number }): T => {
      const start = options.start === undefined ? config.start! : options.start;
      const end = options.end === undefined ? config.end! : options.end;
      const relativePitch = options.relativePitch === undefined ? config.relativePitch! : options.relativePitch;

      const noteMargin = options.margin === undefined ? config.margin! : options.margin;
      const duration = end - start;
      const noteWidth = (duration / lineDuration) * width - noteMargin * 2;

      return {
        ...config,
        x: (start / lineDuration) * width + noteMargin / 2 + this.padding,
        y: height! / 2 - (relativePitch / pitchDiff * lineHeight) - noteHeight + lineHeight / 2 + this.padding,
        height: noteHeight,
        width: noteWidth,
        start: start,
        relativePitch: relativePitch,
        end: end,
      }
    }

    let currentSyllable: UltraStarSyllable | null = null;
    let nearestSyllable: UltraStarSyllable | null = null;

    for(const syllable of this.line.syllables) {
      const start = syllable.start - lineStart;
      const relativePitch = syllable.pitch - lowestPitch;
      const currentNote = syllable.start <= roundedBeat && (syllable.start + syllable.duration) >= roundedBeat;
      if (currentNote) {
        currentSyllable = syllable;
      }

      noteConfigs.push(create({
        type: 'normal', 
        active: currentNote,
        id: syllable.start,
        margin: 2,
      } as SyllablePillConfig, { start, end: start + syllable.duration, relativePitch }));
    }

    if (!currentSyllable) {
      for(const syllable of this.line.syllables) {
        if(syllable.start >= roundedBeat) {
          nearestSyllable = syllable;
          break;
        }
      }
      if(!nearestSyllable){
        nearestSyllable = this.line.syllables[0];
      }
    } else {
      nearestSyllable = currentSyllable;
    }

    const sungPitches = this.sungPitches.map(sung => {
      // recreate sung for resize events
      return create(sung, {});
    });

    // note detection, only when in current line
    if (nearestSyllable) {
      const relativeBeat = roundedBeat - lineStart;

      let singingPitch: number | null = null;

      if (this.pitch?.frequency) {
        const pitch: number | null = frequencyToPitch(Math.round(this.pitch.frequency));
        if (pitch) {
          const targetOctave = Math.floor(nearestSyllable.pitch / 12);
          const syllablePitch = nearestSyllable.pitch;

          const diffs = [-1,0,1].map(octaveDiff => {
            return (targetOctave + octaveDiff) * 12 + (pitch % 12) - syllablePitch;
          });
          let lowestDiff = diffs[0];  
          for(const diff of diffs) {
            if(Math.abs(diff) < Math.abs(lowestDiff)) {
              lowestDiff = diff;
            }
          }
          if(lowestDiff >= 11){
            console.log(Math.round(lowestDiff), diffs);
          }
          if (Math.abs(lowestDiff) < this.maxPitchDiff) {
            singingPitch = syllablePitch;
          } else {
            singingPitch = syllablePitch + Math.round(lowestDiff);
          }

        }
      }

      if(singingPitch && (singingPitch < lowestPitch || singingPitch > highestPitch)) {
        singingPitch = null;
      }

      let closestPitch: SungPitch | null = null;
      let minEndDistance: number | null = null;
      let closestPitchIndex: number | null = null;

      for(let i = sungPitches.length -1 ; i >= 0; i--) {
        const sungPitch = sungPitches[i];
        const endDistance = Math.abs(sungPitch.end! - relativeBeat);
        const isNewMin = (
            closestPitch === null 
            || minEndDistance === null  
          ) || endDistance < minEndDistance
        if (isNewMin && endDistance < 1.1) {

            closestPitch = sungPitch;
            minEndDistance = endDistance;
            closestPitchIndex = i;
            break;
        }
      }

      let equalPitch = false;
      const hits = !!currentSyllable && (currentSyllable.pitch === singingPitch);
      if (closestPitch) {
        equalPitch = closestPitch.pitch === singingPitch 
          && (hits ? closestPitch.hittingNote === currentSyllable : !!closestPitch.hittingNote === hits);
      }

      // expand closest pitch to now
      if (closestPitchIndex !== null && closestPitch && singingPitch !== null) {
        const hittingEnd = closestPitch.hittingNote && closestPitch.hittingNote.start + closestPitch.hittingNote.duration - lineStart;
        sungPitches[closestPitchIndex] = create(closestPitch, {
          end: Math.min(relativeBeat, hittingEnd || relativeBeat), 
          margin: hittingEnd ? 2 : 0,
        });
      }
      if(!equalPitch && singingPitch !== null && (minEndDistance == null || minEndDistance > .2)) {
        sungPitches.push(create({
          pitch: singingPitch,
          hittingNote: hits ? currentSyllable : null,
          id: Math.random(),
        } as SungPitch, {
          start: relativeBeat,
          end: relativeBeat,
          relativePitch: singingPitch - lowestPitch,
          margin: 0,
        }));
      }

      if (hits) {
        const score = sungPitches.reduce((prev, curr) => {
          if (curr.hittingNote) {
            const duration = curr.end! - curr.start!;
            return prev + duration * 10;
          }
          return prev;
        }, 0);
        this.$emit('score', score);
      }

    } 
    this.sungPitches = sungPitches;
    this.noteConfigs = noteConfigs;
    this.textConfigs = textConfigs;
  }

}
</script>

<style lang="scss" scoped>

.pitch {
  position: absolute;
  background-color: #bb0a8fcc;

  &.hits {
    border-radius: 8px;
    background-color: #ff2aca;
    box-shadow: 0 0 19px 7px #ff2aca91;
  }
}

.note {

  position: absolute;
  background-color: rgba(237, 210, 255, 0.5);
  border-radius: 8px;
  transition-property: background-color,box-shadow;
  transition-duration: .3s;
  box-shadow: 0 0 1px 1px #bb0a8f3b;

  &.note-active {
    box-shadow: 0 0 5px 5px #bb0a8f69;
  }
}

</style>