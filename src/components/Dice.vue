<template>
    <div class="dice-container" >
        <div class="dice-cont" v-bind:style="{border: this.border}">
            <div v-if="this.dice.value !== 6" :style="[styleDice]" class="dice"></div>
            <div v-else class="doodle" ><img src="@/assets/doodles/doodle.png" alt=""></div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from 'vuex';
import { Dice } from "../store/interface/dice";

export default defineComponent({
    name: "Dice",
    data() {
        return{
            border: "none",
        }
    },
    props: {
        dice: Object as () => Dice,
    },
    methods: {
        amISelected(value) {
            if(this.dice.fixed === true){
                return
            } else if (this.dice.value === value && this.dice.fixed !== true) {
                this.border = "3px solid red";
            } else {
                this.border = "none";
            }
        },
    },
    computed: {
        ...mapState(['allDice']),
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
                        top: "32.5px",
                        left: "7.5px",
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
                        top: "32.5px",
                        left: "7.5px",
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
    },
    watch: {
        allDice: {
            handler: function(newValue, oldValue) {
                if (this.dice.fixed === false){
                    if (newValue[this.dice.id] && newValue[this.dice.id].selected === true) {
                        this.border = "3px solid red"
                    } else {
                        this.border = "none"
                    }
                }
            },
            deep: true
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
        position: absolute;z

        &:before {
            background-color: yellow;
        }
    }

    .doodle {
        position: absolute;
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