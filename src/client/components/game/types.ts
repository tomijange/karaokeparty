

export interface ContainerConfig {
  height: number;
  width: number;
  x?: number;
  y?: number;
  id?: string | number;
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