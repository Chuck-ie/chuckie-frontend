<script setup lang="ts">
import { ref } from 'vue';
defineExpose({startTimer, stopTimer, resetTimer})

const formattedTime = ref("0.000");
var interval:number;
var passedTime:number = 0;

function startTimer(): void {

    clearInterval(interval);

    // we use 52 to trick the user into thinking the timer refreshes more times
    // than it actually does to reduce computation complexity
    interval = setInterval(() => {
        passedTime += 52;
        formattedTime.value = `${(passedTime/1000).toFixed(3)}`;
    }, 52)
}

function stopTimer(): void {

    clearInterval(interval);
    
}

function resetTimer(): void {

    clearInterval(interval);
    formattedTime.value = "0.000";
}

</script>

<template>
    
    <div>
        <p>Timer: {{ formattedTime }}</p>
    </div>

</template>

<style scoped>
p {
    margin-top: 10px;
    margin-bottom: 5px;
}

</style>