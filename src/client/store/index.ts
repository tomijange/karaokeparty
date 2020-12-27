import Vue from 'vue'
import Vuex from 'vuex'
import { EventMessages } from "@/shared/game/messages";
import State from "@/client/store/state";
import main from './main';

Vue.use(Vuex)

export default new Vuex.Store<State>({
  modules: {
    main
  }
})
