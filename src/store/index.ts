import { createStore } from "vuex";

import { GameVar } from "./interface/gamevar";
import { Player } from "./interface/player";
import { Tile } from './interface/tile';

export const store = createStore({
    state(): GameVar {
        return {
            gameStatus: "empty",
            difficulty: "simple",
            nrOfPlayers: 2,
            currentPlayerIndex: 0,
            players: [
                {
                    id: "1",
                    name: "user",
                    playing: true,
                    canThrowDice: true,
                    canFixDice: true,
                    canPickTile: true,
                    winStatus: false,
                    tilePile: [],
                    diceValue: 0,
                    score: 0,
                    active: true
                },
                {
                    id: "2",
                    name: "comp",
                    playing: false,
                    canThrowDice: false,
                    canFixDice: false,
                    canPickTile: false,
                    winStatus: false,
                    tilePile: [],
                    diceValue: 0,
                    score: 0,
                    active: true
                }
            ],
            tiles: [
                {
                    id: "0",
                    value: 21,
                    doodleValue: 1,
                    owner: "table",
                    selected: false,
                    active: true
                },
                {
                    id: "1",
                    value: 22,
                    doodleValue: 1,
                    owner: "table",
                    selected: false,
                    active: true
                },
                {
                    id: "2",
                    value: 23,
                    doodleValue: 1,
                    owner: "table",
                    selected: false,
                    active: true
                },
                {
                    id: "3",
                    value: 24,
                    doodleValue: 1,
                    owner: "table",
                    selected: false,
                    active: true
                },
                {
                    id: "4",
                    value: 25,
                    doodleValue: 2,
                    owner: "table",
                    selected: false,
                    active: true
                },
                {
                    id: "5",
                    value: 26,
                    doodleValue: 2,
                    owner: "table",
                    selected: false,
                    active: true
                },
                {
                    id: "6",
                    value: 27,
                    doodleValue: 2,
                    owner: "table",
                    selected: false,
                    active: true
                },
                {
                    id: "7",
                    value: 28,
                    doodleValue: 2,
                    owner: "table",
                    selected: false,
                    active: true
                },
                {
                    id: "8",
                    value: 29,
                    doodleValue: 3,
                    owner: "table",
                    selected: false,
                    active: true
                },
                {
                    id: "9",
                    value: 30,
                    doodleValue: 3,
                    owner: "table",
                    selected: false,
                    active: true
                },
                {
                    id: "10",
                    value: 31,
                    doodleValue: 3,
                    owner: "table",
                    selected: false,
                    active: true
                },
                {
                    id: "11",
                    value: 32,
                    doodleValue: 3,
                    owner: "table",
                    selected: false,
                    active: true
                },
                {
                    id: "12",
                    value: 33,
                    doodleValue: 4,
                    owner: "table",
                    selected: false,
                    active: true
                },
                {
                    id: "13",
                    value: 34,
                    doodleValue: 4,
                    owner: "table",
                    selected: false,
                    active: true
                },
                {
                    id: "14",
                    value: 35,
                    doodleValue: 4,
                    owner: "table",
                    selected: false,
                    active: true
                },
                {
                    id: "15",
                    value: 36,
                    doodleValue: 4,
                    owner: "table",
                    selected: false,
                    active: true
                }
            ],
            allDice: [],
            fixedDice: []
        };
    },
    getters: {
        getPlayers: (state: GameVar, payload): Player => state.players[payload],
        // getFixedDice: (state: GameVar) => state.allDice.map((obj) => obj.fixed === true)
        getFixedDice: (state: GameVar) =>
            state.allDice.map(obj => {
                if (obj.fixed === true) {
                    return obj;
                }
            }),
        parentsTurn: (state: GameVar, payLoad: string) =>
            state.players.forEach(player => {
                if (player.name === payLoad && player.playing === true) {
                    return true;
                } else {
                    return false;
                }
            })
    },

    actions: {},

    mutations: {
        startNewGame: (state: GameVar): void => {
            state.gameStatus = "inProgress";
            state.players[state.currentPlayerIndex].active = true;
            // function get's its use when in the future more players can join and have to wait for eachother
        },
        throwDice: (state: GameVar): void => {
            // every dice that is not fixed by a player should be rolled with a .3s interval. A watcher in the diceBoard component has to watch for dice value changes.
            if (state.players[state.currentPlayerIndex].canThrowDice === true) {
                for (let x = 0; x < 8 - state.fixedDice.length; x++) {
                    const value = Math.floor(Math.random() * 6) + 1;
                    const doodle = value === 6;
                    const dice = {
                        id: x.toString(),
                        value: value,
                        doodle: doodle,
                        selected: false,
                        fixed: false
                    };
                    state.allDice.push(dice);
                }

                state.players[state.currentPlayerIndex].canThrowDice = false;
                state.players[state.currentPlayerIndex].canFixDice = true;
            } else {
                console.log("you cant throw dice at this point");
            }
        },
        selectDice: (state: GameVar, payload: number): void => {
            // make a map function
            if (state.players[state.currentPlayerIndex].canFixDice === true) {
                state.allDice.forEach(element => {
                    if (element.value === payload && element.fixed === false) {
                        element.selected = true;
                    } else {
                        element.selected = false;
                    }
                });
            }
        },
        fixDice: (state: GameVar, payLoad: number): void => {
            let checks = 0;

            console.log(state.allDice);
            // check if value is allowed to be fixed
            state.fixedDice.forEach(element => {
                element.selected = false;
                if (element.fixed === true && element.value === payLoad) {
                    console.log("this value was allready selected, choose another dice");
                    checks++;
                }
            });

            // check if playing player is allowed to select
            if (state.players[state.currentPlayerIndex].canFixDice === false) {
                console.log("you are not allowed to fix these dice at this point");
                checks++;
            }

            console.log(checks);
            // then fix all dice with payLoad value
            state.allDice.forEach(element => {
                console.log("fix dice");
                if (checks === 0) {
                    if (element.value === payLoad) {
                        // add fixed value to diceValue
                        if (element.value === 6) {
                            state.players[state.currentPlayerIndex].diceValue += 5;
                        } else {
                            state.players[state.currentPlayerIndex].diceValue += element.value;
                        }
                        element.selected = false;
                        element.fixed = true;
                        state.fixedDice.push(element);
                    }

                    state.players[state.currentPlayerIndex].canFixDice = false;
                    state.players[state.currentPlayerIndex].canThrowDice = true;
                    state.allDice = [];
                }
            });

            // if active table owned tilevalues contain diceValue => player.canPickTile = true && fixedDice contains minimal 1 Dice.worm = true

            // if dice.length = 0 && fixedDice.contains(dice.worm === false) => turn highest tile
            // if no active table owned tiles are left => game won by highest worm count
        },
        pickTile: (state: GameVar, payLoad:Tile ): void => {

            if( state.players[state.currentPlayerIndex].diceValue === payLoad.value && 
                state.players[state.currentPlayerIndex].canPickTile === true && 
                state.fixedDice.filter(tile => tile.doodle === true).length > 0 &&
                payLoad.owner !== state.players[state.currentPlayerIndex].name &&
                payLoad.active === true ) {

                    // before adding a new top tile to the stack make all below inactive
                    state.players[state.currentPlayerIndex].tilePile.forEach(element => {
                        element.active = false;
                    })

                    const tileIndex = state.tiles.map(function(tile) {
                        return tile.value;
                    }).indexOf(payLoad.value)

                const selectedTile = state.tiles[tileIndex]
                selectedTile.owner = state.players[state.currentPlayerIndex].name
                state.tiles.splice(tileIndex, 1)
                state.players[state.currentPlayerIndex].tilePile.push(selectedTile)
            }

            // change player
            // start computer alg
            // reset players settings
        }
    },
    modules: {}
});
