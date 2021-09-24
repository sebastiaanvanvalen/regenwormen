// import { GameVar } from '../interface/GameVar';
import { GameVar } from '@/store/interface/gamevar';
import { Player } from '../interface/player';

const state = { 
    gameStatus: "empty",
    difficulty: "simple",
    nrOfPlayers: 2,
    players: [{
        id: '1',
        name: 'user',
        playing: false,
        winStatus: false,
        tilePile: [],
        diceStack: [],
        score: 0,
        active: false,
    },
    {
        id: '2',
        name: 'comp',
        playing: false,
        winStatus: false,
        tilePile: [],
        diceStack: [],
        score: 0,
        active: false,
    },]
};
const getters = {
    getPlayers: (state:GameVar, payload):Player => state.players[payload],
};

const actions = {

};

const mutations = {
    startNewGame: (state:GameVar):void => {
        state.gameStatus = "inProgress";
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}