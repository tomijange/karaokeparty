import MainState from "@/client/store/main/state";
import RootState from "@/client/store/state";
import { getStoreAccessors } from 'typesafe-vuex';
import { EventMessages } from "@/shared/game/messages";
import { ActionContext } from "vuex";
import {
  commitAddUser,
  commitRemoveUser,
  commitSetCurrentMatch,
  commitSetError, commitSetMe,
  mutations
} from "@/client/store/main/mutations";
import { Match, User } from "@/shared/game/types";
import router from "@/client/router";

const { dispatch } = getStoreAccessors<MainState, RootState>("");
type MainContext = ActionContext<MainState, RootState>;


export const actions = {
  showError(context: MainContext, error: string) {
    commitSetError(context, error);
  },
  ['SOCKET_' + EventMessages.Error](context: MainContext, payload: string) {
    dispatchShowError(context, payload);
  },
  ['SOCKET_' + EventMessages.JoinMatch](context: MainContext, match: Match) {
    commitSetCurrentMatch(context, match);
    if (router.currentRoute.params.gameId === match.gameId) {
      return;
    }
    router.push({name: 'Game Lobby', params: { gameId: match.gameId }});
  },
  ['SOCKET_' + EventMessages.UserJoined](context: MainContext, user: User) {
    commitAddUser(context, user);
  },
  ['SOCKET_' + EventMessages.UserLeft](context: MainContext, user: User) {
    commitRemoveUser(context, user);
  },
  ['SOCKET_' + EventMessages.Me](context: MainContext, user: User) {
    commitSetMe(context, user);
  }
};

export const dispatchShowError = dispatch(actions.showError);

