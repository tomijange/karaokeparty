import { UltraStarFile } from "../ultrastar-parser/types";

export type GameId = string;
export type UserId = number;

export type UserState = 'new' | 'lobby' | 'ready';
export type MatchState = 'voting' | 'singing' | 'final';
export type UserType = 'leader' | 'normal';
export type PlayerState = 'loading' | 'ready' | 'finished';

export class User {
  name = 'Bobby';
  state: UserState = 'new';
  playerState: PlayerState = 'loading';
  avatar = '🙂';
  type: UserType = 'normal';
  score = 0;

  constructor(public userId: UserId) {}
}

export interface Match {
  gameId: GameId;
  users: User[];
  state: MatchState;
  playerState: PlayerState;

  currentSong?: UltraStarFile;
  nextGameId?: GameId;
}
