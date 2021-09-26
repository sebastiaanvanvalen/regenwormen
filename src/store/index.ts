import { createStore } from "vuex";

import { GameVar } from "./interface/gamevar";
import { Player } from "./interface/player";

export const store = createStore({
  state(): GameVar {
    return {
      gameStatus: "empty",
      difficulty: "simple",
      nrOfPlayers: 2,
      players: [
        {
          id: "1",
          name: "user",
          playing: true,
          winStatus: false,
          tilePile: [],
          diceStack: [],
          score: 0,
          active: true
        },
        {
          id: "2",
          name: "comp",
          playing: false,
          winStatus: false,
          tilePile: [],
          diceStack: [],
          score: 0,
          active: true
        }
      ],
      tiles: [
        {
          id: "21",
          value: 21,
          doodleValue: 1,
          owner: "table",
          selected: false,
          active: true
        },
        {
          id: "22",
          value: 22,
          doodleValue: 1,
          owner: "table",
          selected: false,
          active: true
        },
        {
          id: "23",
          value: 23,
          doodleValue: 1,
          owner: "table",
          selected: false,
          active: true
        },
        {
          id: "24",
          value: 24,
          doodleValue: 1,
          owner: "table",
          selected: false,
          active: true
        },
        {
          id: "25",
          value: 25,
          doodleValue: 2,
          owner: "table",
          selected: false,
          active: true
        },
        {
          id: "26",
          value: 26,
          doodleValue: 2,
          owner: "table",
          selected: false,
          active: true
        },
        {
          id: "27",
          value: 27,
          doodleValue: 2,
          owner: "table",
          selected: false,
          active: true
        },
        {
          id: "28",
          value: 28,
          doodleValue: 2,
          owner: "table",
          selected: false,
          active: true
        },
        {
          id: "29",
          value: 29,
          doodleValue: 3,
          owner: "table",
          selected: false,
          active: true
        },
        {
          id: "30",
          value: 30,
          doodleValue: 3,
          owner: "table",
          selected: false,
          active: true
        },
        {
          id: "31",
          value: 31,
          doodleValue: 3,
          owner: "table",
          selected: false,
          active: true
        },
        {
          id: "32",
          value: 32,
          doodleValue: 3,
          owner: "table",
          selected: false,
          active: true
        },
        {
          id: "33",
          value: 33,
          doodleValue: 4,
          owner: "table",
          selected: false,
          active: true
        },
        {
          id: "34",
          value: 34,
          doodleValue: 4,
          owner: "table",
          selected: false,
          active: true
        },
        {
          id: "35",
          value: 35,
          doodleValue: 4,
          owner: "table",
          selected: false,
          active: true
        },
        {
          id: "36",
          value: 36,
          doodleValue: 4,
          owner: "table",
          selected: false,
          active: true
        }
      ],
      allDice: [
        {
          id: "1",
          value: 0,
          doodle: false,
          selected: false,
          fixed: false
        },
        {
          id: "2",
          value: 0,
          doodle: false,
          selected: false,
          fixed: false
        },
        {
          id: "3",
          value: 0,
          doodle: false,
          selected: false,
          fixed: false
        },
        {
          id: "4",
          value: 0,
          doodle: false,
          selected: false,
          fixed: false
        },
        {
          id: "5",
          value: 0,
          doodle: false,
          selected: false,
          fixed: false
        },
        {
          id: "6",
          value: 0,
          doodle: true,
          selected: false,
          fixed: false
        },
        {
          id: "7",
          value: 0,
          doodle: false,
          selected: false,
          fixed: false
        },
        {
          id: "8",
          value: 0,
          doodle: false,
          selected: false,
          fixed: false
        }
      ]
    };
  },
  getters: {
    getPlayers: (state: GameVar, payload): Player => state.players[payload]
  },

  actions: {},

  mutations: {
    startNewGame: (state: GameVar): void => {
      state.gameStatus = "inProgress";
      state.players.forEach(player => {
        // function get's its use when in the future more players can join and have to wait for eachother
        player.active = true;
      });
    },
    throwDice: (state: GameVar): void => {
      // every dice that is not fixed by a player should be rolled with a .3s interval. A watcher in the diceBoard component has to watch for dice value changes.
      state.allDice.forEach((dice, index) => {
        const value = Math.floor(Math.random() * 6) + 1;
        console.log(value);
        dice.value = value;
      });
    },
    selectDice: (state: GameVar, payload:number): void => {
        console.log(payload)
        // make a map function
        state.allDice.forEach(element => {
            if (element.value === payload){
                console.log(element.value)
                element.selected = true
            }
        })
        console.log(state.allDice)
    },
    deSelectDice: (state: GameVar):void => {
        console.log("deselect dice")
        state.allDice.forEach(element => {
            element.selected = false
        });
    }  
},
  modules: {}
});
