import { UltraStarFile } from "../ultrastar-parser/types";

export type GameId = string;
export type UserId = number;

export type UserState = 'new' | 'lobby' | 'ready';
export type MatchState = 'voting' | 'singing' | 'final';
export type UserType = 'leader' | 'normal';

export class User {
  name = 'Bobby';
  state: UserState = 'new';
  avatar = '🙂';
  type: UserType = 'normal';

  constructor(public userId: UserId) {}
}

export interface Match {
  gameId: GameId;
  users: User[];
  state: MatchState;

  currentSong: UltraStarFile | undefined;
}
