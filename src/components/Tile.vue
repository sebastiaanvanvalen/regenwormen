<template>
        <transition name="fade" mode="out-in">
    <div class="container" @click="this.pick(this.tile)">
        <div v-if="tile.active === false && tile.owner === 'table'" class="back"></div>

        <div v-else-if="tile.active === true && tile.owner === 'table'" class="tile table-tile">
            <p>{{tile.value}}</p>
            <img v-if="this.tile.doodleValue === 1" src="@/assets/doodles/doodle1.png" :key="this.tile.id" alt="d1" />
            <img v-else-if="this.tile.doodleValue === 2" src="@/assets/doodles/doodle2.png" :key="this.tile.id" alt="d2" />
            <img v-else-if="this.tile.doodleValue === 3" src="@/assets/doodles/doodle3.png" :key="this.tile.id" alt="d3" />
            <img v-else src="@/assets/doodles/doodle4.png" :key="this.tile.id" alt="d4" />
        
        </div>
        <div v-else class="tile player-tile">
            <p>{{tile.value}}</p>
            <img v-if="this.tile.doodleValue === 1" src="@/assets/doodles/doodle1.png" :key="this.tile.id" alt="d1" />
            <img v-else-if="this.tile.doodleValue === 2" src="@/assets/doodles/doodle2.png" :key="this.tile.id" alt="d2" />
            <img v-else-if="this.tile.doodleValue === 3" src="@/assets/doodles/doodle3.png" :key="this.tile.id" alt="d3" />
            <img v-else src="@/assets/doodles/doodle4.png" :key="this.tile.id" alt="d4" />
        </div>
    </div>
        </transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState, mapMutations } from "vuex";
import MessageClass from "./classes/MessageClass";
import { Tile } from '../store/interface/tile';

export default defineComponent({
    name: "Tile",
    props: {
        tile: Object as () => Tile,
    },
    methods:{
        ...mapMutations(["pickTile", "loseRound", "adjustMessage", "endGame"]),
        pick(){

            let message;
            let receiver = this.players[this.currentPlayerIndex].name
            let opponentIndex;
            
            if(this.currentPlayerIndex === 0){
                opponentIndex = 1
            } else {
                opponentIndex = this.players[0].name;
            }

            // does not work in local enviorment. you play both sides so you push a tile from both perspeectives.
            // if(this.players[opponentIndex].playing === false) {return}

            if (this.players[this.currentPlayerIndex].diceValue < 21) {
                message = 'you can not pick a tile at this point';
                let messageClass = new MessageClass("none", receiver, message, "none", true );
                this.adjustMessage(messageClass.getMessage());

            } else if (this.fixedDice.filter(tile => tile.doodle).length === 0) {
                message = 'You need at least one doodle if you want to pick a tile';
                let messageClass = new MessageClass("none", this.players[this.currentPlayerIndex].name, message, "none", true );
                this.adjustMessage(messageClass.getMessage());

            } else if (this.tiles.filter(tile => tile.id ===[ parseInt(this.tile.id)]).active === false) {
                message = 'this tile is not available for you to take';
                let messageClass = new MessageClass("none", receiver, message, "none", true );
                this.adjustMessage(messageClass.getMessage());
            
            } else if (this.tile.owner === this.players.map(player => player.playing).owner) {
                message = 'you can not take your own tile';
                let messageClass = new MessageClass("none", receiver, message, "none", true );
                this.adjustMessage(messageClass.getMessage());
            
            } else if (this.players[this.currentPlayerIndex].diceValue > this.tile.value) {
                message = 'sorry, you will have to select a higher value tile';
                let messageClass = new MessageClass("none", this.players[this.currentPlayerIndex].name, message, "none", true );
                this.adjustMessage(messageClass.getMessage());
                
            } else if (this.players[this.currentPlayerIndex].diceValue < this.tile.value) {
                message = 'sorry, you will have to select a higher value tile';
                let messageClass = new MessageClass("none", this.players[this.currentPlayerIndex].name, message, "none", true );
                this.adjustMessage(messageClass.getMessage());

            } else {
                this.pickTile(this.tile);
            }

            // do we have a winner?
            if( this.tiles.filter(tile => tile.active).length === 0) {
                this.players.forEach(element =>{
                    element.playing = false
                })
                this.endGame()
                if (this.players[this.currentPlayerIndex].doodleScore < this.players[opponentIndex].doodleScore) {
                let message = this.players[opponentIndex].name + " wins";
                let messageClass = new MessageClass("win", this.players[this.currentPlayerIndex].name, message, "none", true );
                this.adjustMessage(messageClass.getMessage());

                } else if (this.players[this.currentPlayerIndex].doodleScore === this.players[opponentIndex].doodleScore) {
                let message = "Dear players, it's a tie!";
                let messageClass = new MessageClass("win", this.players[this.currentPlayerIndex].name, message, "none", true );
                this.adjustMessage(messageClass.getMessage());

                } else {
                let message = this.players[this.currentPlayerIndex].name + " wins!!!";
                let messageClass = new MessageClass("win", this.players[this.currentPlayerIndex].name, message, "none", true );
                this.adjustMessage(messageClass.getMessage());

                }
            }
        },
    },
    computed:{
    ...mapState(['players', 'fixedDice', 'allDice', 'tiles', 'currentPlayerIndex', "message"]),
    },
});
</script>

<style scoped lang="scss">
        // .fade-leave-from{
        //     transform: translateY(0);
        // }
        // .fade-leave-to {
        //     transform: translateY(100%);
        // }
        .fade-leave-active {
            transition: all 1s;
        }

        // .fade-enter-from {
        //     transform: translateY(-100%);
        // }
        // .fade-enter-to {
        //     transform: translateY(0);
        // }
        .fade-enter-active {
            transition: all 1s;
        }


    .tile {
        position: relative;
        display: flex;
        flex-direction: column;
        font-family: 'Permanent Marker', cursive;
        justify-content: space-between;
        font-weight: bold;
        font-size: 18px;
        color: black;
        height: 80px;
        width: 50px;
        padding: 4px;
        margin: 4px;
        border-radius: 5px;
        background-color: rgb(252, 248, 248);
        background-image: linear-gradient(
            hsla(0, 0%, 100%, 0.6), hsla(0, 3%, 86%, 0.3) 50%,
            hsla(0, 3%, 86%, 0.3) 50%, hsla(0, 0%, 100%, 0.2)
        );
        box-shadow:
            inset 0 -5px 3px hsla(0, 0%, 0%, 0.4),
            inset 0 5px 3px hsla(0, 0%, 100%, 0.4),
            -8px 8px 5px hsla(0, 0%, 0%, 0.15),
            5px 18px 3px hsla(0, 0%, 0%, 0.2);

        cursor: pointer;
        transition: transform 0.1s, box-shadow 0.1s;

        p {
            border-bottom: 4px solid black;
        }

        &:hover {
            transform: scale(1.4);
            z-index: 100;
            background-color: rgb(255, 255, 255);
            box-shadow:
                inset 0 -5px 3px hsla(0, 0%, 49%, 0.4),
                inset 0 5px 3px hsla(0, 0%, 100%, 0.212),
                            -8px 8px 5px hsla(0, 0%, 0%, 0.15),
            5px 18px 3px hsla(0, 0%, 0%, 0.2);
        }
    }

    .tile:before {
        content: '';
        display: block;
        position: absolute;
        top: 0%;
        left: 0;
        width: 100%;
        height: 99%;
        border-radius: 5px;
        background: linear-gradient(
        hsla(0, 0%, 100%, 0.185), hsla(0, 0%, 100%, 0.199) );
    }

    .player-tile {
        position: absolute;

        &:hover {
            transform: scale(1.2);
            top: -20px;
        }
    }

    .back {
        border-radius: 5px;
        background-color: rgba(228, 228, 222, 0.918);
        margin: 4px;
        height: 80px;
        width: 50px;
    }
</style>