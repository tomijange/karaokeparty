import express, { Request, Response } from 'express';
import { songs } from '../songs/fileRepository';
export const router = express.Router({
  strict: true
});

router.get('/songs', (req: Request, res: Response) => {
   res.send(songs);
});