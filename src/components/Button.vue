<template>
    <div class="button-container">
        <button
            class="button"
            @click="pushButton()"
            :style="[styleButton]"
        >{{ this.player.playing ? "throw" : "una momento" }}</button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState, mapMutations } from "vuex";
import { Player } from "../store/interface/player";

export default defineComponent({
    name: "Dice",
    props: {
        player: Object as () => Player
    },
    methods: {
        ...mapMutations(["throwDice"]),

        pushButton() {

            // before throwing dice
            if(this.players.playing === false){
                confirm('it is not your turn to throw dice yet')
            } else {
                this.throwDice()
            }
            // console.log(this.players[this.player.id - 1].playing)
            // console.log(this.allDice.map(dice => dice.value))
            // console.log(this.fixedDice.map(dice => dice.value))
            // console.log(this.allDice.map(dice => dice.value).every(val => this.fixedDice.map(dice => dice.value).includes(val)))

            this.checkDice()

        },
        checkDice() {
            // after dice are thrown
            if (this.players[parseInt(this.player.id) - 1].playing === true && 
                this.allDice.map(dice => dice.value).every(val => this.fixedDice.map(dice => dice.value).includes(val))) {
                // unable to fix dice because of conflicting values
                setTimeout(() => {
                    confirm('you threw values that you allready have... better luck next time')
                    this.loseRound()
                }, 500)

            }

        }
    },
    computed: {
        ...mapState(['players', 'fixedDice', 'allDice', 'tiles']),

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
                        backgroundColor: "green"
                    };
                    break;
                case false:
                    style = {
                        padding: "16px",
                        fontSize: "18px",
                        border: "none",
                        color: "white",
                        borderRadius: "5px",
                        backgroundColor: "red"
                    };
                    break;
                default:
                    console.log('no button styling could be initiated')
                    break;
            }
            return style;
        }
    }
});
</script>

<style scoped lang="scss">
</style>