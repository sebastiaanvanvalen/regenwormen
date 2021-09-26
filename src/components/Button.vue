
// this needs to be a generic component
<template>
    <div class="button-container">
        <button
            class="button"
            @click="pushButton()"
            :style="[styleButton]"
        >{{ this.parentCommand.text }}</button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ParentCommand from "./interface/parentCommand.vue";
import { mapMutations } from "vuex";

export default defineComponent({
    name: "Dice",
    props: {
        parentCommand: Object as () => typeof ParentCommand
    },
    methods: {
        pushButton() {
            switch (this.parentCommand.function) {
                case "throw":
                    console.log("start function throw")
                        this.throwDice();
                    break;
                default:
                    break;
            }
        },
        ...mapMutations(['throwDice'])
    },
    computed: {
        styleButton() {
            let style;
            switch (this.parentCommand.function) {
                case "initial":
                    style = {
                        height: "100%"
                    };
                    break;
                case "throw":
                    console.log("throw");
                    style = {
                        padding: "16px",
                        fontSize: "18px",
                        border: "none",
                        color: "white",
                        borderRadius: "5px",
                        backgroundColor: "green"
                    };
                    break;
                default:
                    break;
            }
            return style;
        }
    }
});
</script>

<style scoped lang="scss">
</style>