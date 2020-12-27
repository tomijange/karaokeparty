import MainState from "./state";
import { mutations } from "@/client/store/main/mutations";
import { actions } from "@/client/store/main/actions";
import { getters } from "@/client/store/main/getters";


export default {
  state: new MainState(),
  mutations,
  actions,
  getters,
}
