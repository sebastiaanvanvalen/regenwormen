<template>
    <div class="dice-board-container">
        <p>dice board </p>
            <div class="throw-area">
                <Dice @click="fixValues(dice.value)" @mouseover="selectValues(dice.value)" v-for="dice in allDice" :key="dice.id" :dice="dice" />
            </div>
            <div class="fixed-area">
                <Dice v-for="(dice, index) in this.myFixedDice" :key="index" :dice="dice" />
            </div>


        </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState, mapMutations, mapGetters } from "vuex";
import Dice from "./Dice.vue";

export default defineComponent({
    name: "DiceBoard",
    components: {
        Dice
        },
    data() {
        return {
            myFixedDice: []
        }
    },
    methods: {
        ...mapMutations(["selectDice", "fixDice"]),

        selectValues(value) {
            this.selectDice(value)
        },

        fixValues(value){
            console.log("fix all " +value +"'s")
            this.fixDice(value);
        },

        collectFixedDice(){
            // console.log("we need to collect dice")
        },

    },
    computed: {
        ...mapState(['allDice', 'fixedDice']),

        ...mapGetters(["getFixedDice"]),
    },
        watch: {
            fixedDice: {
                handler: function(newValue, oldValue) {
                console.log(newValue)
                this.myFixedDice = newValue
            },
            deep: true
        }
    }
});
</script>

<style scoped lang="scss">
    .dice-board-container {
        height: auto;
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: space-between;
        
        p {
            font-family: 'Permanent Marker', cursive;
            font-size: 32px;
            color: white;
        }   

        .throw-area {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: flex-start;
            height: auto;
            width: 100%;
        }

        .fixed-area {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: flex-end;
            height: auto;
            width: 100%;
        }
    }

</style>