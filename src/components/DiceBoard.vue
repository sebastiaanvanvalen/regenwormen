<template>
    <div class="dice-board-container">
        <p>dice board</p>
        <div class="throw-area">
            <Dice
                @click="fixValues(dice.value)"
                @mouseover="selectValues(dice.value)"
                v-for="dice in allDice"
                :key="dice.id"
                :dice="dice"
            />
        </div>
        <div class="fixed-area">
            <Dice v-for="(dice, index) in this.fixedDice" :key="index" :dice="dice" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState, mapMutations, mapGetters } from "vuex";
import Dice from "./Dice.vue";
import MessageClass from "./classes/MessageClass";

export default defineComponent({
    name: "DiceBoard",
    components: {
        Dice
    },
    methods: {
        ...mapMutations(["selectDice", "fixDice", "adjustMessage", "loseRound", "resetMessage", "endGame"]),
        selectValues(value) {
            this.selectDice(value);
        },
        fixValues(value) {
            this.resetMessage()

            this.fixDice(value);
            let message;
            let receiver = this.players[this.currentPlayerIndex].name
            let opponentIndex

            if(this.currentPlayerIndex === 0){
                opponentIndex = 1
            } else {
                opponentIndex = 0
            }

            if (this.fixedDice.filter(dice => dice.doodle === true).length === 0 &&
                this.fixedDice.length === 8 ) {
                // all out of dice and no doodle
                message = 'unfortinately you threw all dice without collecting a doodle. Good luck next time.';
                let messageClass = new MessageClass("none", receiver, message, "none", true );
                this.adjustMessage(messageClass.getMessage());
                this.loseRound();
            } 
            
            if ( this.fixedDice.length === 8 && 
                // player has doodle
                this.fixedDice.filter(tile => tile.doodle === true).length > 0 &&
                // dice value doenst match any active tiles on the table
                !this.tiles.map(tile => tile.active ? tile.value : 0).includes(this.players[this.currentPlayerIndex].diceValue)
                ) {
                // dice value does not match opponents top tile (if he has tiles)
                if(this.players[opponentIndex].tilePile[this.players[opponentIndex].tilePile.length - 1].value !== this.players[this.currentPlayerIndex].diceValue){
                    message = 'yes, you have a doodle but you are out of dice. And their value does not match a tile. It is your opponents turn';
                    let messageClass = new MessageClass("none", receiver, message, "none", true );
                    this.adjustMessage(messageClass.getMessage());
                    this.loseRound();
                }
            } 

            // dices to high for table?
            if(this.tiles.map(tile => tile.active ? tile.value : 0).every(val => val < this.players[this.currentPlayerIndex].diceValue)){

                //opponent has a tilePile
                if (this.players[opponentIndex].tilePile.length > 0) {

                    // opponent's top tile is lower than dicevalue
                    if (this.players[this.currentPlayerIndex].diceValue > this.players[opponentIndex].tilePile[this.players[opponentIndex].tilePile.length - 1].value){

                        message = 'the value of your dice is to high to pick any tile...';
                        let messageClass = new MessageClass("none", receiver, message, "none", true );
                        this.adjustMessage(messageClass.getMessage());
                        this.loseRound();
                    } 
                } else {
                    message = 'the value of your dice is to high to pick any tile...';
                    let messageClass = new MessageClass("none", receiver, message, "none", true );
                    this.adjustMessage(messageClass.getMessage());
                    this.loseRound();
                }
            }
        }
    },
    computed: {
        ...mapState(["allDice", "fixedDice", "currentPlayerIndex", "players", "tiles"]),
        ...mapGetters(["getFixedDice"]),
    },
});
</script>

<style scoped lang="scss">
    .dice-board-container {
        height: auto;
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: space-between;

        p {
            font-family: "Permanent Marker", cursive;
            font-size: 32px;
            color: white;
        }

        .throw-area {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: flex-start;
            height: auto;
            width: 100%;
        }

        .fixed-area {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: flex-end;
            height: auto;
            width: 100%;
        }
    }
</style>