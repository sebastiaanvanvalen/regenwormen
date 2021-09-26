<template>
    <div id="app">
        <div class="nav" id="na">
            <Header />
        </div>
        <Board />
    </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Board from "@/components/Board.vue";

export default {
    name: "app",
    components: {
        Header,
        Board
    }
};
</script>

<style>
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100vh;
    max-height: calc(100vh - 60px);
}

#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}
</style>
