<template>
    <div class="tile-stack-container">
        <p>tilestack</p>

        
        </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from 'vuex';

export default defineComponent({
    name: "TileStack",
    props: {
        parent: Object,
    },
    computed: {
        ...mapGetters(["getTileStack"]),
    },
    // watcher for function when tilestack changes?
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


</style>