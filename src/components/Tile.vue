<template>
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
            let oponentIndex;
            
            if(this.currentPlayerIndex === 0){
                oponentIndex = 1
            } else {
                oponentIndex = this.players[0].name;
            }

            if (this.players.map(player => player.playing).name === "comp") {
                message = 'you are not playing at the moment.';
                let messageClass = new MessageClass("none", this.players[oponentIndex].name, message, "none", true );
                this.adjustMessage(messageClass.getMessage());

            } else if (this.fixedDice.filter(tile => tile.doodle).length === 0) {
                message = 'You need at least one doodle if you want to pick a tile';
                let messageClass = new MessageClass("none", this.players[oponentIndex].name, message, "none", true );
                this.adjustMessage(messageClass.getMessage());

            } else if (this.tiles.filter(tile => tile.id ===[ parseInt(this.tile.id)]).active === false) {
                message = 'this tile is not available for you to take';
                let messageClass = new MessageClass("none", receiver, message, "none", true );
                this.adjustMessage(messageClass.getMessage());
            
            } else if (this.tile.owner === this.players.map(player => player.playing).owner) {
                message = 'you can not take your own tile';
                let messageClass = new MessageClass("none", receiver, message, "none", true );
                this.adjustMessage(messageClass.getMessage());
            
            } else if(!this.players[this.currentPlayerIndex].canPickTile) {
                message = 'you can not pick a tile at this point';
                let messageClass = new MessageClass("none", receiver, message, "none", true );
                this.adjustMessage(messageClass.getMessage());

            } else if(this.players[this.currentPlayerIndex].diceValue !== this.tile.value) {
                message = 'this tile has not the same value as your dice...';
                let messageClass = new MessageClass("none", receiver, message, "none", true );
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
                if(this.players[this.currentPlayerIndex].doodleScore < this.players[oponentIndex].doodleScore) {
                    console.log(this.players[oponentIndex].name + " wins");
                } else if (this.players[this.currentPlayerIndex].doodleScore === this.players[oponentIndex].doodleScore){
                    console.log("it's a tie!");
                }else {
                    console.log(this.players[this.currentPlayerIndex].name + " wins");
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
    .tile {
        font-family: 'Permanent Marker', cursive;
        font-weight: bold;
        font-size: 18px;
        color: black;
        height: 80px;
        width: 50px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 4px;
        margin: 4px;
        border-radius: 5px;
        background-color: rgb(241, 239, 232);
        box-shadow: 0 0 1px 1px rgb(168, 167, 162);

        p {
            border-bottom: 4px solid black;
        }

        &:hover {
            transform: scale(1.4);
            z-index: 100;
            border: 1px solid #ccc;
            box-shadow: 0 0 2px 1px white;  
        }
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