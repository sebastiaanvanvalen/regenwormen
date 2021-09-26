// this needs to be a generic component that can be used for a computerPlayer or user(s)

<template>
    <div class="player-container">
        <TileStack />
        <p>{{ this.player }} </p>
        <Button class="button" :parentCommand="parentCommand" />
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
            parentCommand: {
                function: "throw",
                text: "throw"
                }
            }
        },
    components: {
        TileStack, Button
    },
    props: {
        player: String,  
    },

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
        height: 30%;
        background-color: lightseagreen;

        .button {
            align-self: center;
        }
    }

</style>