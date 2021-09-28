<template>
    <div class="tile-stack-container">{{this.parent.name}}'s tile stack :<div >
        <Tile class="tiles" :style="{left: index * 20 + 'px'}" v-for="(tile, index) in this.players[parseInt(this.parent.id) -1].tilePile || []" :key="tile.id" :tile="tile"/>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Tile from './Tile.vue';
import { mapState, mapGetters } from 'vuex';
import { Player } from "../store/interface/player";

export default defineComponent({
    name: "TileStack",
    components: {
        Tile,
    },
    props: {
        parent: Object as () => Player,
    },
    computed: {
        ...mapGetters(["getTileStack"]),
        ...mapState(['players', 'tiles'])
    },
});
</script>

<style scoped lang="scss">
.tile-stack-container {
    position: relative;
    font-family: "Permanent Marker", cursive;
    color: white;

    .tiles {
        position: absolute;
    }
}
</style>