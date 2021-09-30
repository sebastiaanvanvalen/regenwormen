import { Tile } from './tile';

export interface Player {
    id: string;
    name: string;
    playing: boolean;
    canThrowDice: boolean;
    canFixDice: boolean;
    winStatus: boolean;
    tilePile: Tile[];
    diceValue: number;
    doodleScore: number;
    active: boolean;
}