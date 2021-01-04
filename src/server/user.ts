import { User, UserId } from "@/shared/game/types";
import { Socket } from "socket.io";
import ServerMatch from "@/server/match";

export default class ServerUser extends User {

  public match?: ServerMatch;
  public socket: Socket

  constructor(socket: Socket, userId: UserId | User, copyFrom?: User) {
    super(userId instanceof User ? userId.userId : userId);
    this.socket = socket;
    if (userId instanceof ServerUser) {
      this.match = userId.match;
      this.type = userId.type;
    }
    if (copyFrom) {
      this.name = copyFrom.name;
      this.state = copyFrom.state;
      this.avatar = copyFrom.avatar;
      this.playerState = copyFrom.playerState;
      this.score = copyFrom.score;
    }
  }

  public reset() {
    this.state = 'new';
    this.playerState = 'loading';
    this.score = 0;
  }


  public toJSON() {
    const { match, socket, ...other } = this;
    return other;
  }

}
