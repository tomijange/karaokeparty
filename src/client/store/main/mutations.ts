import { getStoreAccessors } from 'typesafe-vuex';
import MainState from "@/client/store/main/state";
import RootState from "@/client/store/state";
import { Match, User } from "@/shared/game/types";

export const mutations = {
  setError(state: MainState, payload: string) {
    state.error = payload;
  },
  setCurrentMatch(state: MainState, match: Match) {
    state.currentMatch = match;
  },
  addUser(state: MainState, user: User) {
    if(state.currentMatch?.users.find(other => other.userId === user.userId)){
      // already in match
      return;
    }
    state.currentMatch?.users.push(user);
  },
  removeUser(state: MainState, user: User) {
    if(state.currentMatch){
      state.currentMatch.users = state.currentMatch.users.filter(other => other.userId !== user.userId);
    }
  },
  updateUser(state: MainState, user: User) {
    if(state.currentMatch) {
      state.currentMatch.users = state.currentMatch.users.map(other => other.userId === user.userId ? user : other);
    }
  },
  setMe(state: MainState, user: User | null) {
    state.me = user;
  }
};

const { commit } = getStoreAccessors<MainState, RootState>("");

export const commitSetError = commit(mutations.setError);
export const commitSetCurrentMatch = commit(mutations.setCurrentMatch);
export const commitAddUser = commit(mutations.addUser);
export const commitRemoveUser = commit(mutations.removeUser);
export const commitSetMe = commit(mutations.setMe);
export const commitUpdateUser = commit(mutations.updateUser);
