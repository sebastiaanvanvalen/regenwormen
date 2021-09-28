<template>
    <header>
        <button @click="startNewGame()">{{ buttonMessage }}</button>
        <div class="score-container">
            <div class="score userScore">your score: {{ this.$store.state.players[0].doodleScore || 0 }}</div>
            <div class="score compScore">opponents score: {{this.$store.state.players[1].doodleScore || 0}}</div>
        </div>
    </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState, mapMutations } from "vuex";

export default defineComponent({
    name: "Header",
    data() {
        return {
            buttonMessage: "",
            userScore: 1,
            compScore: 0,
        }
    },
    methods: {
        ...mapMutations(["startNewGame"]),
        setButtonText(status) {
            if (status === "empty") {
                this.buttonMessage = "new Game"
            } else {
                this.buttonMessage = "restart"
            }
        },
        startNewGame() {
            this.$store.state.gameVars.commit('startNewgame')
        },
    },
    computed: {
        ...mapState(['gameStatus'])
    },
    mounted() {
        this.setButtonText(this.gameStatus)
    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    header {
        display: flex;
        justify-content: left;
        align-items: center;
        width: 100%;
        height: 60px;
        background-color: #BBB;

        button {
            width: 100px;
            height: 40px;
            background-color: green;
            border: none;
            cursor: pointer;
            color: white;
            font-size: 14px;
            padding: 8px;
            margin: 0 8px;
        }

        .score-container {
            display: flex;
            width: 100%;
            justify-content: space-between;
            margin: 0 24px;

            .score {
                color: white;
                background-color: #666;
                padding: 4px;
                border-radius: 4px;
            }
        }
    }
</style>
