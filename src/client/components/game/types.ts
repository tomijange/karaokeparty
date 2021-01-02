import { UltraStarSyllable } from "@/shared/ultrastar-parser/types";


export interface ContainerConfig {
  height: number;
  width: number;
  x?: number;
  y?: number;
  id?: string | number;
  start?: number; // start beat of this pitch
  end?: number; // the end beat of this pitch
  relativePitch?: number;
  margin?: number;
}

export interface SyllablePillConfig extends ContainerConfig {
  type: 'normal',
  active: boolean,
  progressWidth?: number;
}

export interface TextConfig {
  text: string;
  active: boolean;
  id?: string | number;
}

export interface Pitch {
  note: string; 
  frequency: number
}

export interface SungPitch extends ContainerConfig {
  pitch: number;
  hittingNote: UltraStarSyllable | null; // the hitting note
}