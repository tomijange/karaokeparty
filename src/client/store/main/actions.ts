import MainState from "@/client/store/main/state";
import RootState from "@/client/store/state";
import { getStoreAccessors } from 'typesafe-vuex';
import { EventMessages } from "@/shared/game/messages";
import { ActionContext } from "vuex";
import {
  commitAddUser,
  commitRemoveUser,
  commitSetCurrentMatch,
  commitSetError, commitSetMe, commitSetSongs, commitUpdateUser,
  mutations
} from "@/client/store/main/mutations";
import { Match, User } from "@/shared/game/types";
import router from "@/client/router";
import socket from "@/client/api/socket";
import { readMe } from "./getters";
import { api } from "@/client/api";
const { dispatch } = getStoreAccessors<MainState, RootState>("");
type MainContext = ActionContext<MainState, RootState>;


export const actions = {
  async getSongs(context: MainContext){
    const songs = await api.getSongs();
    commitSetSongs(context, songs);
  },
  updateMe(context: MainContext, user: User) {
    commitSetMe(context, user);
    commitUpdateUser(context, user);
    setTimeout(() => readMe(context) === user ? socket.emit(EventMessages.UpdateMe, user) : null, 1000);
  },
  showError(context: MainContext, error: string) {
    commitSetError(context, error);
  },
  ['SOCKET_' + EventMessages.Error](context: MainContext, payload: string) {
    dispatchShowError(context, payload);
  },
  ['SOCKET_' + EventMessages.MatchInfo](context: MainContext, match: Match) {
    commitSetCurrentMatch(context, match);
    if (router.currentRoute.name !== `game-${match.state}`){
      router.push({name: `game-${match.state}`, params: { gameId: match.gameId }});
    }
  },
  ['SOCKET_' + EventMessages.UserJoined](context: MainContext, user: User) {
    commitAddUser(context, user);
  },
  ['SOCKET_' + EventMessages.UserLeft](context: MainContext, user: User) {
    commitRemoveUser(context, user);
  },
  ['SOCKET_' + EventMessages.Me](context: MainContext, user: User) {
    commitSetMe(context, user);
  },
  ['SOCKET_' + EventMessages.UserUpdated](context: MainContext, user: User) {
    commitUpdateUser(context, user);
  },
};

export const dispatchShowError = dispatch(actions.showError);
export const dispatchUpdateMe = dispatch(actions.updateMe);
export const dispatchGetSongs = dispatch(actions.getSongs);
