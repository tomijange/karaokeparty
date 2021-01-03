import { UltraStarFile, UltraStarType } from "@/shared/ultrastar-parser/types";
import { API_URL } from "./backend";


const api = {
  async getSongs() {
    const response = await fetch(`${API_URL}/songs`);
    const json = await response.json();
    return Object.values(json) as UltraStarFile[];
  }
};

export { api };