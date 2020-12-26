import {
  UltraStarBody,
  UltraStarFile,
  UltraStarHeader,
  UltraStarLine,
  UltraStarSyllable,
  UltraStarType
} from "./types";
import { log } from "../index";


export function parseUltrastarFile(file: string): UltraStarFile {

  const lines = file.split(/\r?\n/);

  const header = new class implements UltraStarHeader {
    artist = '';
    bpm = 0;
    cover = '';
    edition = '';
    gap = 0;
    genre = '';
    language = '';
    mp3 = '';
    video = '';
    year = 0;
    title = '';
  };

  const body: UltraStarBody = {
    lines: []
  }

  let currentLine: UltraStarLine = { syllables: [] };
  body.lines.push(currentLine);

  lines.forEach(line => {
    const entryTypeString = line.substring(0, 1);
    if (!entryTypeString) {
      return;
    }
    const entryType = Object.values(UltraStarType).find(type => type === entryTypeString);
    if (!entryType) {
      console.error("No UltraStarType named '" + entryTypeString + "' found");
      return;
    }

    if (entryType === UltraStarType.Header) {
      const index = line.toLowerCase().indexOf(':');
      const key = line.toLowerCase().substring(1, index) as keyof UltraStarHeader;
      const value = line.substring(index + 1) as string;
      if (typeof header[key] === 'number') {
        (header[key] as unknown) = +value.replace(',', '.');
      } else {
        (header[key] as unknown) = value;
      }
      return;
    }
    if (entryType === UltraStarType.End) {
      log("End of file");
      return;
    }
    if (entryType === UltraStarType.Linebreak) {
      currentLine.end = +line.substring(line.indexOf(' '));
      currentLine = { syllables: [] };
      body.lines.push(currentLine);
      return;
    }

    const startIndex = line.indexOf(' ');
    const durationIndex = line.indexOf(' ', startIndex+1);
    const pitchIndex = line.indexOf(' ', durationIndex+1);
    const textIndex = line.indexOf(' ', pitchIndex+1);
    if (textIndex === -1) {
      console.error("Invalid syllable in line '" + line + "'");
      return;
    }

    const syllable: UltraStarSyllable = {
      type: entryType,
      start: +line.substring(startIndex, durationIndex),
      duration: +line.substring(durationIndex, pitchIndex),
      pitch: +line.substring(pitchIndex, textIndex),
      text: line.substring(textIndex)
    };


    if(currentLine.start === undefined) {
      currentLine.start = syllable.start;
    }

    currentLine.syllables.push(syllable);
  })


  return { header, body } as UltraStarFile;
}
