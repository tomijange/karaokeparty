

export enum EventMessages {
  CreateMatch = 'create-match', // server-bound
  JoinMatch = 'join-match', // user wants to join a match
  MatchInfo = 'match-info', // the match information
  UserJoined = 'user-joined', // if a user joined
  UserLeft = 'user-left', // if a user disconnected
  UserUpdated = 'user-update', // if a user edits its settings
  Error = 'game-error', // if an error occurs in server logic
  WhoAmI = 'who-am-i', // ask server who i am
  Me = 'me', // get the answer of who am i
  UpdateMe = 'update-me', // updates yourself,
  StartMatch = 'start-match', // user pressed start button,
  SetSong = 'set-song',
  RestartLobby = 'restart-lobby',
  SetDifficulty = 'set-difficulty',
}
