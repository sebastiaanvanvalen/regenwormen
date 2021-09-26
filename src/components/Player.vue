<template>
    <div class="player-container">
        <TileStack :parent="parentCommand" />
        <p>{{ this.player }} </p>
        <Button v-if="this.myTurn" class="button" :parentCommand="parentCommand" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TileStack from "./TileStack.vue";
import Button from "./Button.vue";

export default defineComponent({
    name: "Player",
    data() {
        return {
            myTurn: this.$store.state.players[this.player].playing,
            parentCommand: {
                function: "throw",
                text: "throw",
                parentName: this.player
                }
            }
        },
    components: {
        TileStack, Button
    },
    props: {
        player: String,  
    },
        watch: {
        players: {
            handler: function(newValue, oldValue) {
                console.log("hi")
                if(newValue[this.player] === true) {
                    this.myTurn = true
                } else {
                    this.myTurn = false;
                }
            },
            deep: true
        }
    }

});
</script>

<style scoped lang="scss">
    .player-container {
        max-width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 24px;
        border: 2px solid green;
        border-radius: 5px;
        height: 100%;
        background-color: lightseagreen;

        .button {
            align-self: center;
        }
    }

</style>