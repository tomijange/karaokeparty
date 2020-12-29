
import { parseUltrastarFile } from '@/shared/ultrastar-parser';
import { UltraStarFile } from '@/shared/ultrastar-parser/types';
import fs from 'fs';
import path from 'path';

const dataPath = './data';

const songs: UltraStarFile[] = [];

try {
    fs.readdirSync(dataPath).forEach(file => {
        console.log(file);
        try {
            const output = parseUltrastarFile(fs.readFileSync(path.join(dataPath, file)).toString());
            console.log(JSON.stringify(output, null, 2));
            songs.push(output);
        } catch (e) {
            console.error(e);
        }
    })
} catch(e) {
    console.error(e);
}

export default {
    songs
}
