import { Tile } from './tile';
import { Dice } from './dice';

export interface Player {
    id: string;
    name: string;
    playing: boolean;
    winStatus: boolean;
    tilePile: Tile[];
    diceStack: Dice[];
    score: number;
    active: boolean;
}