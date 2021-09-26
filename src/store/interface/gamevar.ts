import { Player } from './player';
import { Tile } from './tile';
import { Dice } from './dice';

export interface GameVar {
    gameStatus: "empty" | "ready" | "inProgress" | "finished";
    difficulty: "simple" | "hard";
    nrOfPlayers: number;
    currentPlayerIndex: number;
    players: Player[];
    tiles: Tile[];
    allDice: Dice[];
    fixedDice: Dice[];
}
