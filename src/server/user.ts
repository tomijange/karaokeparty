import { User, UserId } from "@/shared/game/types";
import { Socket } from "socket.io";
import ServerMatch from "@/server/match";

export default class ServerUser extends User {

  public match?: ServerMatch;

  public socket: Socket

  constructor(socket: Socket, userId: UserId) {
    super(userId);
    this.socket = socket;
  }

  public toJSON() {
    const {match, socket, ...other} = this;
    return other;
  }

}
