import Match from "@/server/match";
import { GameId } from "@/shared/game/types";

export default class GameHandler {

  matches: Match[] = [];

  /**
   * creates a new match and returns it
   */
  public createMatch(): Match {
    const match = new Match();
    this.matches.push(match);
    return match;
  }

  /**
   * Finds the given match or undefined
   * @param gameId the gameId
   */
  public findMatch(gameId: GameId): Match | undefined {
    return this.matches.find(match => match.gameId === gameId);
  }

  /**
   * Removes the match
   *
   * @param match
   */
  public removeMatch(match: Match) {
    this.matches = this.matches.filter(other => other.gameId !== match.gameId);
  }


}

export const gameHandler = new GameHandler();
