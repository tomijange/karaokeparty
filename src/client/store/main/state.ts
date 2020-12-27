import { Match, User } from "@/shared/game/types";

export default class MainState {
  error = '';
  currentMatch: Match | null = null;
  me: User | null = null;
}
