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

export default defineComponent({
    name: "DiceBoard",
    components: {
        Dice
    },
    methods: {
        ...mapMutations(["selectDice", "fixDice"]),

        selectValues(value) {
            this.selectDice(value);
        },

        fixValues(value) {
            this.fixDice(value);
            let opponentIndex
            if(this.currentPlayerIndex === 0){
                opponentIndex = 1;
            } else {
                opponentIndex = 2;
            }
            if (this.fixedDice.length > 0 &&
                this.fixedDice.filter(tile => tile.doodle === true).length === 0 &&
                this.fixedDice.length === 8 ) {
                // all out of dice and no doodle
                setTimeout(() => {
                    confirm("unfortinately you threw all dice without collecting a doodle. Good luck next time.");
                    this.loseRound();
                }, 500);
            } 
            
            if ( this.fixedDice.length === 8 && 
                // player has doodle
                this.fixedDice.filter(tile => tile.doodle === true).length > 0 &&
                // dice value doenst match any active tiles on the table
                !this.tiles.map(tile => tile.active ? tile.value : 0).contains(this.players[this.currentPlayerIndex].diceValue) &&
                // dice value does not match opponents top tile
                this.players[opponentIndex].tilePile[this.players[opponentIndex].tilePile.length - 1].value !== this.players[this.currentPlayerIndex].diceValue) {
                setTimeout(() => {
                    confirm('yes, you have a doodle but you are out of dice. And their value does not match a tile. It is your opponents turn');
                    this.loseRound();
                }, 500);
            } 

            // wincheck in component
        },
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