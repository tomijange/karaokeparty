import MainState from "@/client/store/main/state";
import RootState from "@/client/store/state";
import { getStoreAccessors } from 'typesafe-vuex';

const { dispatch, read } = getStoreAccessors<MainState, RootState>("");

export const getters = {
  getError(state: MainState) {
    return state.error;
  },
  getCurrentMatch(state: MainState) {
    return state.currentMatch;
  },
  getMe(state: MainState) {
    return state.me;
  }
};

export const readError = read(getters.getError);
export const readCurrentMatch = read(getters.getCurrentMatch);
export const readMe = read(getters.getMe);
