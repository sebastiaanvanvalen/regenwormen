// this needs to be a generic component

<template>
<div class="container" @click="this.pick(this.tile)">

    <div v-if="tile.active === true" class="tile-container">
        <p>{{tile.value}}</p>

        <img v-if="this.tile.doodleValue === 1" src="@/assets/doodles/doodle1.png" :key="this.tile.id" alt="d1" />
        <img v-else-if="this.tile.doodleValue === 2" src="@/assets/doodles/doodle2.png" :key="this.tile.id" alt="d2" />
        <img v-else-if="this.tile.doodleValue === 3" src="@/assets/doodles/doodle3.png" :key="this.tile.id" alt="d3" />
        <img v-else-if="this.tile.doodleValue === 4" src="@/assets/doodles/doodle4.png" :key="this.tile.id" alt="d4" />

        <!-- is this (in another form) needed? -->
        <h1 v-else>{{ tile.doodleValue }}</h1>
        
        </div>
    <div v-else class="back"></div>
</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState, mapMutations } from "vuex";
import { Tile } from '../store/interface/tile';

export default defineComponent({
    name: "Tile",
    props: {
        tile: Object as () => Tile,
    },
    methods:{
        ...mapMutations(['pickTile', 'loseRound']),
        pick(){
            console.log(this.tiles[this.tile.id].active)
            if (this.players.map(player => player.playing).name === "comp") {
                confirm('you are not playing at the moment.')

            } else if (this.fixedDice.filter(tile => tile.doodle).length === 0) {
                confirm('You need at least one doodle if you want to pick a tile')
            
            } else if (this.tiles[parseInt(this.tile.id)].active === false) {
                confirm('this tile is not available for you to take')
            
            } else if (this.tile.owner === this.players.map(player => player.playing).owner) {
                confirm('you can not take your own tile')
            
            } else if(!this.players[this.currentPlayerIndex].canPickTile) {
                confirm('you can not pick a tile at this point')
            } else {
                this.pickTile(this.tile)
            }
        },
    },
    computed:{
    ...mapState(['players', 'fixedDice', 'allDice', 'tiles', 'currentPlayerIndex']),

    },
});
</script>

<style scoped lang="scss">

.tile-container {
    font-family: 'Permanent Marker', cursive;
    font-weight: bold;
    font-size: 18px;
    color: black;
    height: 80px;
    width: 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 4px;
    margin: 4px;
    border-radius: 5px;
    background-color: rgb(241, 239, 232);

    p {
        border-bottom: 4px solid black;
    }

    &:hover {
        transform: scale(1.4);
        border: 1px solid #ccc;
        box-shadow: 0 0 2px 1px white;  
    }
}

.back {
    border-radius: 5px;
    background-color: rgba(228, 228, 222, 0.918);
    margin: 0 4px;
    height: 80px;
    width: 50px;
}


</style>