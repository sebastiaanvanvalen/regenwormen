// this needs to be a generic component that is used within every player comonent

<template>
    <div class="dice-board-container">
        <p>dice board </p>
            <div class="throw-area">
                <Dice v-for="dice in allDice" :key="dice.id" :dice="dice"/>
            </div>


        </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";
import Dice from "./Dice.vue";

export default defineComponent({
    name: "DiceBoard",
    components: {Dice},
    computed: {
        ...mapState(['allDice'])
    }
});
</script>

<style scoped lang="scss">
    .dice-board-container {
        height: auto;
        
        p {
            font-family: 'Permanent Marker', cursive;
            font-size: 48px;
            color: white;
        }   

        .throw-area {
            display: flex;
            flex-wrap: wrap;
            height: 30%;
            width: 100%;
        }
    }

</style>