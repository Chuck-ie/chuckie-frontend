<script setup lang="ts">
import { ref } from 'vue';

const gameGrid:any = ref([])

function setGamesize(): void {

    gameGrid.value = []
    const windowWidth:number = window.innerWidth * 0.83;
    const windowHeight:number = window.innerHeight * 0.8;
    
    const columns:number = Math.floor(windowWidth/20);
    const rows:number = Math.floor(windowHeight/20);

    for (var i = 0; i < rows; i++) {
        gameGrid.value.push([]);
        for (var j = 0; j < columns; j++) {
            gameGrid.value[i].push({"visited": false})
        }
    }
}

window.addEventListener("resize", () => setGamesize());
setGamesize()

</script>
<template>

    <table class="gamefield">
        <tr v-for="row in gameGrid">
            <td v-for="col in row"></td>
        </tr>       
    </table>

</template>
<style scoped>

.gamefield {
    position: absolute;
    width: 83%;
    border-spacing: 0;
    height: 80%;
    left: 15%;
    top: 60px;
}

td:last-child {
    border-right: 1px solid white;
}

tr:last-child td {
    border-bottom: 1px solid white;
}

td {
    width: 20px;
    height: 20px;
    padding: 0;
    margin: 0;
    border: 1px solid white;
    border-right: 0;
    border-bottom: 0;
    background-color: grey;
}
</style>
