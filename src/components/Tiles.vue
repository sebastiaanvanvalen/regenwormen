<template>
    <div class="tiles-container">
        <Messages />

            <Tile v-for="tile in tiles" :key="tile.id" :tile="tile" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";
import Messages from "./Messages.vue";
import Tile from "./Tile.vue";

export default defineComponent({
    name: "Tiles",
    components: {
        Tile,
        Messages
    },
    computed: {
        ...mapState(["tiles"])
    }
});
</script>

<style scoped lang="scss">
    .tiles-container {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        justify-content: center;
        align-items: center;
        padding: 8px 16px 16px;
        border-radius: 5px;
        background-color: green;
        height: auto;
        max-width: 100%;
    }
</style>