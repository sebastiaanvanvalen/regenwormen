<template>
    <div class="tiles-container">
        <Tile v-for="tile in tiles" :key="tile.id" :tile="tile" />

        </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Tile from "./Tile.vue";
import { mapState } from "vuex";

export default defineComponent({
    name: "Tiles",
    components: {
        Tile
    },
    props: ["tileMessage"],
    computed: {
        ...mapState(["tiles"])
        }

});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .tiles-container {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        justify-content: center;
        align-items: center;
        padding: 16px;
        border-radius: 5px;
        background-color: green;
        height: 30%;
        max-width: 100%;
    }

</style>