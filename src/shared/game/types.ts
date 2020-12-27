export type GameId = string;
export type UserId = number;

export type UserState = 'new' | 'lobby' | 'ready';
export type MatchState = 'voting' | 'singing' | 'final';

export class User {
  name = 'Bobby';
  state: UserState = 'new';

  constructor(public userId: UserId) {}
}

export interface Match {
  gameId: GameId;
  users: User[];
  state: MatchState;
}
