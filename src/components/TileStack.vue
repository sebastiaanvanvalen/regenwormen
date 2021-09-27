<template>
    <div class="tile-stack-container">
        <p>tilestack</p>
        <Tile v-for="tile in this.players[parseInt(this.parent.id) -1].tilePile || []" :key="tile.id" :tile="tile"/>
        
        </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Tile from './Tile.vue';
import { mapState, mapGetters } from 'vuex';

export default defineComponent({
    name: "TileStack",
    components: {
        Tile
    },
    props: {
        parent: Object,
    },
    computed: {
        ...mapGetters(["getTileStack"]),
        ...mapState(['players'])
    },
});
</script>

<style scoped lang="scss">


</style>