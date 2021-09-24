import { createStore } from "vuex";
import gameVars from "./modules/gamevars";
import players from "./modules/players";
import tiles from "./modules/tiles";
import dice from "./modules/dice";

export default createStore({
  state: {
    counter: 4
  },
  getters: {
    getCounter(state) {
      return state.counter;
    }
  },
  modules: {
    gameVars,
    players,
    tiles,
    dice
  }
});
