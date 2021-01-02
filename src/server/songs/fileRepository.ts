
import { parseUltrastarFile } from '@/shared/ultrastar-parser';
import { UltraStarFile } from '@/shared/ultrastar-parser/types';
import debug from '../debug';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

const dataPath = './data';

const songs: UltraStarFile[] = [];

export const addSong = (file: UltraStarFile) => {
  debug(chalk.cyan("Added song ") + chalk.bold("%s") + chalk.cyan(" - ") + chalk.bold("%s") + " (" + chalk.underline("%s") + ")", file.header.title, file.header.artist, file.header.youtube);
  songs.push(file);
}

try {
  fs.readdir(dataPath, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }
    files.forEach(file => {
      try {
        const output = parseUltrastarFile(fs.readFileSync(path.join(dataPath, file)).toString(), 'header');
        if (!output) {
          return;
        }
        addSong(output);
      } catch (e) {
        console.error(e);
      }
    });
  });
} catch (e) {
  console.error(e);
}

export { songs };
