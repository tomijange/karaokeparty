

export enum UltraStarType {
  Header = '#', // header
  NormalNote = ':',// 'normal note'
  GoldenNote = '*', // 'golden note'
  FreestyleNote = 'F', // 'freestyle note'
  Linebreak = '-', // 'linebreak'
  End = 'E', // 'end'
}

export interface UltraStarHeader {
  title: string;
  artist: string;
  edition: string;
  language: string;
  genre: string;
  year: number;
  mp3: string;
  cover: string;
  video: string;
  bpm: number;
  gap: number;
  youtube: string;
}

export interface UltraStarSyllable {
  type: UltraStarType;
  start: number;
  duration: number;
  pitch: number;
  text: string;
}

export interface UltraStarLine {
  syllables: UltraStarSyllable[];
  start?: number;
  end?: number;
}

export interface UltraStarBody {
  lines: UltraStarLine[];
}

export interface UltraStarFile {
  header: UltraStarHeader;
  body: UltraStarBody;
  id: string | number;
}
