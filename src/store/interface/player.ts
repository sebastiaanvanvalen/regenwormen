import { Tile } from './tile';
import { Dice } from './dice';

export interface Player {
    id: string;
    name: string;
    playing: boolean;
    canThrowDice: boolean;
    canFixDice: boolean;
    canPickTile: boolean;
    winStatus: boolean;
    tilePile: Tile[];
    diceStack: Dice[];
    score: number;
    active: boolean;
}