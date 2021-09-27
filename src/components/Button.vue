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





            switch (this.player.playing) {
                case true:
                    this.throwDice();
                    break;
                case false:
                    confirm("please wait for the other player to finish")
                    break;
                default:
                    break;
            }
        },
    },
    computed: {
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