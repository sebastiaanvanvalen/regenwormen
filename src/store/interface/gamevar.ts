import { Player } from './player';

export interface GameVar {
    gameStatus: "empty" | "ready" | "inProgress" | "finished";
    difficulty: "simple" | "hard";
    nrOfPlayers: number;
    players: Player[];
}
