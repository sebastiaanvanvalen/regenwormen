<template>
    <div class="message-container">
            <p>here comes the message output as replacement for the JS confirm messages</p>
            <div class="message">
                // watch: on change true for option erase(x)
                

            </div>
        </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";

export default defineComponent({
    name: "Messages",
    computed: {
        ...mapState(["messages"])
    }

});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .message-container {
        color: white;
        display: flex;
        flex-wrap: wrap;
        width: calc(100% - 32px);
        justify-content: center;
        align-items: center;
        margin: 16px;
        border-radius: 5px;
        background-color: green;
        height: 200px;

    }

</style>