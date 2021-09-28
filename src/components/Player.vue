<template>
    <div class="cont player-container">
        <div class="cont tile-container">
            <TileStack :parent="this.player" />
        </div>

        <div class="cont info-container"></div>
        
        <div class="cont button-container">
            <p>{{ this.player.name }}</p>
            <Button class="button" :player="this.player" />
            <p v-if="this.player.playing">value = {{ this.player.diceValue }}</p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TileStack from "./TileStack.vue";
import Button from "./Button.vue";
import { Player } from "../store/interface/player";

export default defineComponent({
    name: "Player",
    components: {
        TileStack,
        Button,
    },
    props: {
        player: Object as () => Player,
    },
});
</script>

<style scoped lang="scss">
    .player-container {
        max-width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 12px;
        border: 2px solid green;
        border-radius: 5px;
        height: 100%;
        background-color: lightseagreen;

        .cont {
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

        .button-container {
            flex-direction: column;
            justify-content: space-between;
            font-family: "Permanent Marker", cursive;
            font-size: 18px;
            color: white;
        }

        .button {
            align-self: center;
        }
    }
</style>