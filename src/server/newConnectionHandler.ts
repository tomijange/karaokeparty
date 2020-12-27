import { Socket } from "socket.io";
import { gameHandler } from "@/server/gameHandler";
import { EventMessages } from "@/shared/game/messages";
import ServerUser from "@/server/user";
import debug from "@/server/debug";
import chalk from "chalk";

let idCounter = 0;

export default function (socket: Socket) {
  console.log("Got new connection", socket.id);
  const currentUser = new ServerUser(socket, ++idCounter);
  socket.emit(EventMessages.Me, currentUser);


  function errorBoundary(listener: (...args: any[]) => void) {
    return (...args: any[]) => {
      try {
        listener(...args);
      } catch(e) {
        socket.emit(EventMessages.Error, e?.message);
      }
    }
  }

  function on(event: string | symbol, listener: (...args: any[]) => void) {
    return socket.on(event, errorBoundary(listener));
  }

  on(EventMessages.WhoAmI, (message) => {
    socket.emit(EventMessages.Me, currentUser);
  });

  on(EventMessages.CreateMatch, (message) => {
    debug("Create match", message);
    const newMatch = gameHandler.createMatch();
    newMatch.joinUser(currentUser);
  });

  on(EventMessages.JoinMatch, (message) => {
    debug("Join existing match", message);
    const match = gameHandler.findMatch(message);
    if (!match) {
      throw Error("match not found");
    }
    match.joinUser(currentUser);
  })

  on('error', (error) => {
    console.error(error);
  })


  on('disconnect', (listener) => {
    debug("User %s disconnected", chalk.cyan(currentUser.userId));
    currentUser.match?.leaveUser(currentUser);
  });

}

