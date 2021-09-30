<template>
    <transition name="fade" mode="out-in">
        <div v-if="this.message.active" class="message-container">
            <div class="message">
                <p>Dear {{ this.message.receiver }},</p>
                <br />
                {{ this.message.message}}
            </div>
            <div @click="this.resetMessage" class="close-button">&#x2713;</div>
        </div>
    </transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState, mapMutations } from "vuex";

export default defineComponent({
    name: "Messages",
    methods: {
        ...mapMutations(["resetMessage"])
    },
    computed: {
        ...mapState(["message"])
    }
});
</script>

<style scoped lang="scss">

    .fade-enter-from {
        opacity: 0;
    }
    .fade-enter-to {
        opacity: 1;
    }
    .fade-leave-from {
        opacity: 1;
    }
    .fade-leave-to {
        opacity: 0;
    }
    .fade-enter-active{
        transition: all .2s ease;
    }
    .fade-leave-active {
        transition: all .3s ease;
    }


    .message-container {
        position: absolute;
        top: 30%;
        display: flex;
        width: calc(60%);
        justify-content: center;
        height: auto;
        margin: 12px;
        border-left: 4px solid yellow;
        border-right: 4px solid yellow;
        background-color: green;
        border-radius: 5px;
        box-shadow:                             -8px 8px 5px hsla(0, 0%, 0%, 0.15),
                5px 18px 3px hsla(0, 0%, 0%, 0.2);

        .message {
            font-size: 16px;
            font-weight: bold;
            padding: 12px;
            width: auto;
            max-width: 100%;
            color: white;
            border-radius: 5px;
            border-bottom: 2px solid grey;
            pointer-events: none;
        }

        .close-button {
            display: flex;
            cursor: pointer;
            color: rgb(228, 214, 214);
            justify-content: center;
            align-items: center;
            position: absolute;
            width: 28px;
            height: 28px;
            right: 20px;
            top: 10px;
            background: linear-gradient(rgb(1, 156, 1), rgb(1, 94, 1));
            border-radius: 100%;
            pointer-events: auto;

            &:hover {
                border: none;
                color: white;
                transform: scale(1.05);
                background: linear-gradient(rgb(1, 180, 1), rgb(0, 85, 0));
                transition: 0.2s ease-in-out
            }

            &:active {
                color: rgb(228, 214, 214);
                transform: scale(1);
                box-shadow: none;
                background: linear-gradient(rgb(1, 156, 1), rgb(1, 94, 1));
                transition: 0.2s ease-in-out;
            }
        }
    }
</style>