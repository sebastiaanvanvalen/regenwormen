<template>
    <div class="container">
        <div class="board-container">
            <Player :player="this.$store.state.players[1]" />
            <Messages />
            <Tiles class="tiles" :tileMessage="tileMessage" />
            <Player :player="this.$store.state.players[0]" />
        </div>
        <div class="dice-container">
            <DiceBoard />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Player from "./Player.vue";
import Messages from "./Messages.vue";
import Tiles from "./Tiles.vue";
import DiceBoard from "./DiceBoard.vue";

export default defineComponent({
    name: "Board",
    components: {
        Player,
        Tiles,
        DiceBoard,
        Messages,
    },
    data() {
        return {
            tileMessage: "help I'm the TileStack",
        };
    }
});
</script>

<style scoped lang="scss">
.container {
    display: flex;
    justify-content: space-between;
    height: 100%;
    padding: 16px;
    width: 100%;

    .board-container {
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: space-between;
        width: 70%;
    }

    .dice-container {
        background-color: green;
        border-radius: 5px;
        width: 100%;
        width: 28%;
    }
}
</style>