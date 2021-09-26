
// this needs to be a generic component
<template>
    <div @click="selectDice(this.dice.value)" class="dice-container">
        <div v-if="this.dice.value !== 0 && this.dice.fixed === false" class="dice-cont">
            <div v-if="this.dice.value !== 6" :style="[styleDice, selectedDice]" class="dice"></div>
            <div v-else class="doodle" ><img src="@/assets/doodles/doodle.png" alt=""></div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState, mapMutations } from 'vuex';

import { Dice } from "../store/interface/dice";

export default defineComponent({
    name: "Dice",
    data() {
        return{
            diceSelected: false
        }
    },
    props: {
        dice: Object as () => Dice
    },
    methods:{
        ...mapMutations(['selectDice', 'deSelectDice']),
        selectedDice() {
            let style;
            if(this.diceSelected === true) {
            this.selectDice
                style = {border: "3px solid red"}
            }
            return style
        },
    },
    computed: {
        styleDice() {
            let style;
            switch (this.dice.value) {
                case 1:
                    style = {
                        top: "calc(50% - 5px)",
                        left: "calc(50% - 5px)",
                        display: "inline-block"
                    };
                    break;
                case 2:
                    style = {
                        top: "30.5px",
                        left: "5px",
                        display: "inline-block",
                        boxShadow: "25px -25px black",
                    }

                    break;
                case 3:
                    style = {
                        top: "calc(50% - 5px)",
                        left: "calc(50% - 5px)",
                        display: "inline-block",
                        boxShadow: "-12.5px 12.5px black, 12.5px -12.5px black"
                    }
                    break;
                case 4:
                    style = {
                        top: "30px",
                        left: "5px",
                        display: "inline-block",
                        boxShadow: "25px 0px black, 0px -25px black, 25px -25px black",
                    }
                    break;
                case 5:
                    style = {
                        top: "calc(50% - 5px)",
                        left: "calc(50% - 5px)",
                        display: "inline-block",
                        boxShadow: "12.5px 12.5px black, -12.5px 12.5px black, 12.5px -12.5px black, -12.5px -12.5px black",
                    }
                    break;
                case 6:
                    style = {
                        
                    }
                    break;
                default:
                    break;
            }
            return style;
        },

        ...mapState(['allDice'])
    },
    watch: {
        allDice: {
            handler: function(newValue, oldValue) {
                console.log("watching")
                if (newValue === null) {
                    this.visible = true;
                } else {
                    this.setButtonText(newValue)
                }
            },
        }
    }
});
</script>

<style scoped lang="scss">
.dice-cont {
    display: inline-block;
    width: 50px;
    height: 50px;
    border-radius: 5px;
    border: 2px solid black;
    position: relative;
    background-color: whitesmoke;
    margin: 5px;

    .dice {
        background-color: black;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        position: absolute;

        &:before {
            background-color: yellow;
            }
    }

    .doodle {
        height: 100%;
        width: 100%;
        img {
            height: 100%;
            width: 100%;    
        }
    }
    &:hover {
        transform: scale(1.2);
    }
}

</style>