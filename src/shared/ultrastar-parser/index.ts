import sha1 from "sha1";
import {
  UltraStarBody,
  UltraStarFile,
  UltraStarHeader,
  UltraStarLine,
  UltraStarSyllable,
  UltraStarType
} from "./types";


export function parseUltrastarFile(file: string, type: 'header' | 'full' = 'full'): UltraStarFile | null {

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
    youtube = '';
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
      const lastSyllable = currentLine.syllables[currentLine.syllables.length -1];
      currentLine.syllableEnd = lastSyllable.start + lastSyllable.duration;
      currentLine.end = lastSyllable.start + lastSyllable.duration;
      return;
    }
    if (entryType === UltraStarType.Linebreak) {
      const oldLine = currentLine;
      const lastSyllable = oldLine.syllables[oldLine.syllables.length -1];
      oldLine.syllableEnd = lastSyllable.start + lastSyllable.duration;


      currentLine = { syllables: [] };

      const firstNodeIndex = line.indexOf(' ');
      const secondNodeIndex = line.indexOf(' ', firstNodeIndex+1);

      if (secondNodeIndex !== -1) {
        const firstValue = +line.substring(firstNodeIndex, secondNodeIndex);
        const secondValue = +line.substring(secondNodeIndex);

        oldLine.end = firstValue;
        currentLine.start = secondValue;
      } else {
        const firstValue = +line.substring(firstNodeIndex);
        currentLine.start = firstValue;
        oldLine.end = lastSyllable.start + lastSyllable.duration;
      }
      
      
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
      text: line.substring(textIndex+1)
    };


    if(currentLine.syllableStart === undefined) {
      currentLine.syllableStart = syllable.start;
    }

    currentLine.syllables.push(syllable);
  })

  if(!header.title) {
    return null;
  }

  const id = sha1(header.title + '-' + header.artist);

  return { header, body, id } as UltraStarFile;
}
