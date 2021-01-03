import { Match, User } from "@/shared/game/types";
import { UltraStarFile } from "@/shared/ultrastar-parser/types";

export default class MainState {
  error = '';
  currentMatch: Match | null = null;
  me: User | null = null;
  songs: UltraStarFile[] | null = null;
}
