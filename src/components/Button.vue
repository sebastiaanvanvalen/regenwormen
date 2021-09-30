<template>
    <div class="button-container">
        <button
            class="button"
            @click="pushButton()"
            :style="[styleButton]"
        >{{ this.player.playing ? "throw" : "wait" }}</button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState, mapMutations } from "vuex";
import { Player } from "../store/interface/player";
import MessageClass from "./classes/MessageClass";

export default defineComponent({
    name: "Dice",
    props: {
        player: Object as () => Player,
    },
    methods: {
        ...mapMutations(["throwDice", "loseRound", "adjustMessage", "resetMessage", "endGame"]),
        pushButton() {
            let opponentIndex;
            
            if(this.currentPlayerIndex === 0){
                opponentIndex = 1
            } else {
                opponentIndex = 0;
            }
            // before throwing dice
            this.resetMessage();

            if (this.player.playing === false) {
                let message = 'it is not your turn to throw dice yet';
                let messageClass = new MessageClass("none", this.players[this.currentPlayerIndex].name, message, "none", true );
                this.adjustMessage(messageClass.getMessage());
                // this.loseRound();
                return
            } else if(this.player.playing === true && this.players[this.currentPlayerIndex].canThrowDice === false) {
                let message = 'You need to pick dice first!';
                let messageClass = new MessageClass("none", this.players[this.currentPlayerIndex].name, message, "none", true );
                this.adjustMessage(messageClass.getMessage());
            }else {
                this.throwDice();
                console.log("checking rolled dice:")
                console.log(this.fixedDice)
                console.log(this.allDice)
            }

            this.checkDice();

            // is this function needed here?
            // do we have a winner?
            if( this.tiles.filter(tile => tile.active).length === 0) {
                this.players.forEach(element =>{
                    element.playing = false
                })
                this.endGame()
                if(this.players[this.currentPlayerIndex].doodleScore < this.players[opponentIndex].doodleScore) {
                let message = this.players[opponentIndex].name + " wins";
                let messageClass = new MessageClass("none", this.players[this.currentPlayerIndex].name, message, "none", true );
                this.adjustMessage(messageClass.getMessage());

                } else if (this.players[this.currentPlayerIndex].doodleScore === this.players[opponentIndex].doodleScore){
                let message = "Dear players, it's a tie!";
                let messageClass = new MessageClass("none", this.players[this.currentPlayerIndex].name, message, "none", true );
                this.adjustMessage(messageClass.getMessage());

                }else {
                let message = this.players[this.currentPlayerIndex].name + " wins!!!";
                let messageClass = new MessageClass("none", this.players[this.currentPlayerIndex].name, message, "none", true );
                this.adjustMessage(messageClass.getMessage());

                }
            }
        },
        checkDice() {
            // after dice are thrown
            if (
                this.players[parseInt(this.player.id) - 1].playing === true &&
                this.allDice
                    .map(dice => dice.value)
                    .every(val =>
                        this.fixedDice.map(dice => dice.value).includes(val)
                    )
            ) {
                console.log("conflicting values(button.vue :71)")
                console.log(this.fixedDice)
                console.log(this.allDice)
                // unable to fix dice because of conflicting values
                let message = 'unfortinately, the dice you threw contained only values you allready have.';
                let messageClass = new MessageClass("none", this.players[this.currentPlayerIndex].name, message, "none", true );
                this.adjustMessage(messageClass.getMessage());
                    this.loseRound();
            }
        }
    },
    computed: {
        ...mapState(["players", "currentPlayerIndex", "fixedDice", "allDice", "tiles"]),
        styleButton() {
            let style;
            switch (this.player.playing) {
                case true:
                    style = {
                        padding: "16px",
                        fontSize: "18px",
                        border: "none",
                        color: "white",
                        borderRadius: "5px",
                        backgroundColor: "rgb(25, 70, 26)"
                    };
                    break;
                case false:
                    style = {
                        padding: "16px",
                        fontSize: "18px",
                        border: "none",
                        color: "lightgrey",
                        borderRadius: "5px",
                        backgroundColor: "rgb(72, 106, 71)"
                    };
                    break;
                default:
                    console.log("no button styling could be initiated");
                    break;
            }
            return style;
        }
    }
});
</script>

<style scoped lang="scss">
</style>