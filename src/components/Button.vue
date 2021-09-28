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

export default defineComponent({
    name: "Dice",
    props: {
        player: Object as () => Player,
    },
    methods: {
        ...mapMutations(["throwDice", "loseRound"]),

        pushButton() {
            // before throwing dice
            if (this.player.playing === false) {
                confirm("it is not your turn to throw dice yet");
            } else {
                this.throwDice();
            }

            this.checkDice();
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
                // unable to fix dice because of conflicting values
                setTimeout(() => {
                    confirm(
                        "you threw values that you allready have... better luck next time"
                    );
                    this.loseRound();
                }, 500);
            }
        }
    },
    computed: {
        ...mapState(["players", "fixedDice", "allDice", "tiles"]),

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