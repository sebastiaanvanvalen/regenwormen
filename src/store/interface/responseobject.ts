import { Player } from './player';

export interface Responseobject {
    player: Player;
    type: string;
    message: string;
    value: number;
}
