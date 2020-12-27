

export enum EventMessages {
  CreateMatch = 'create-match', // server-bound
  JoinMatch = 'join-match', // client-bound
  UserJoined = 'user-joined', // if a user joined
  UserLeft = 'user-left', // if a user disconnected
  Error = 'game-error', // if an error occurs in server logic
  WhoAmI = 'who-am-i', // ask server who i am
  Me = 'me', // get the answer of who am i
}