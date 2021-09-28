<template>
    <div class="message-container">
        <div v-if="!this.message.active" class="cont">There are no messages at this time</div>
        <div v-else class="cont">
            <div class="message">
            Dear {{ this.message.receiver }},<br>
            {{ this.message.message}}              
            </div>
            <div @click="this.resetMessage" class="close-button">&#x2713;</div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState, mapMutations } from "vuex";

export default defineComponent({
    name: "Messages",
    methods: {
        ...mapMutations(["resetMessage"]),
    },
    computed: {
        ...mapState(["message"]),
    }
});
</script>

<style scoped lang="scss">
    .message-container {
        display: flex;
        width: calc(100% - 24px);
        justify-content: center;
        margin: 12px;
        border-radius: 8px;
        border-left: 3px solid red;
        border-right: 3px solid red;

        .cont {
            position: relative;
            color: white;
            display: flex;
            flex-wrap: wrap;
            width: 100%;
            justify-content: center;
            align-items: center;
            padding: 12px;
            border-radius: 5px;
            background-color: green;
            height: auto;

            .close-button {
                display: flex;
                cursor: pointer;
                justify-content: center;
                align-items: center;
                position: absolute;
                width: 28px;
                height: 28px;
                right: 20px;
                top: 10px;
                // border: 1px solid white;
                background: linear-gradient(rgb(1, 156, 1), rgb(1, 94, 1));
                border-radius: 100%;
            }
        }
    }
</style>