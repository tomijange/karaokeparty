import { GameId, Match, MatchState, User } from "@/shared/game/types";
import { EventMessages } from "@/shared/game/messages";
import { Server } from "socket.io";
import { io } from '.';
import ServerUser from "@/server/user";
import { gameHandler } from "@/server/gameHandler";
import debug from "@/server/debug";

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";

function generateGameId(length = 4): GameId {
  let output = '';
  for (let i = 0; i < length; i++) {
    output += chars.charAt(Math.random() * chars.length);
  }
  return output;
}

export default class ServerMatch implements Match {
  public gameId: GameId;
  public users: User[] = [];
  public state: MatchState = 'voting';
  private room: Server;
  private removeTaskId?: NodeJS.Timeout;

  constructor() {
    this.gameId = generateGameId();
    this.room = io.in(this.gameId);
  }

  public joinUser(user: ServerUser) {
    if (user.match) {
      console.error("User " + user.userId + " already is in a match");
      // leave from other match
      user.match.leaveUser(user);
    }
    debug("Joined user " + user.userId + " to " + this.gameId);

    user.match = this;
    this.users = [...this.users, user];
    user.socket.join(this.gameId);

    // send join information to joining user
    user.socket.emit(EventMessages.JoinMatch, this);

    // send user joined event
    this.room.emit(EventMessages.UserJoined, user);
  }

  public leaveUser(user: ServerUser) {
    debug("Quit user " + user.userId + " from " + this.gameId);

    this.users = this.users.filter(users => users.userId !== user.userId);

    // tell everybody a user left
    this.room.emit(EventMessages.UserLeft, user);

    // leave from room
    user.socket.leave(this.gameId);

    if(!this.users.length) {
      this.checkEmpty();
    }
  }

  private checkEmpty() {
    if (this.removeTaskId) {
      return;
    }
    this.removeTaskId = setTimeout(() => {
      if (!this.users.length) {
        debug('Removing match')
        gameHandler.removeMatch(this);
      }
      this.removeTaskId = undefined;
    }, 1000 * 10)
  }


  public toJSON() {
    const { room, removeTaskId, ...other } = this;
    return other;
  }
}
