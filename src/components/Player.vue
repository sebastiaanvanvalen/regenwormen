<template>
    <div class="cont player-container">
        <div class="cont tile-container">
            <TileStack :parent="this.player" />
        </div>
        <div class="cont info-container">
            <p>{{ this.player.name }}</p>
            <p>DiceCount = {{ this.player.diceValue }}</p>
            <p>DoodleCount =</p>
        </div>
        <div class="cont button-container">
            <Button class="button" :player="this.player" />
        </div>
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

        };
    },
    components: {
        TileStack,
        Button
    },
    props: {
        player: Object 
    },
    computed: {},
    watch: {
        players: {
            handler: function(newValue, oldValue) {
                console.log("hi");
                if (newValue[this.player.id] === true) {
                    this.myTurn = true;
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

    .cont {
        // border: 1px solid blue;
        width: 30%;
    }

    .info-container {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        font-family: "Permanent Marker", cursive;
        font-size: 18px;
        color: white;
    }

    .button {
        align-self: center;
    }
}
</style>