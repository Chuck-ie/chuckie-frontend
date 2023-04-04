<script setup lang="ts">
import { ref } from "vue";

const formattedTime = ref("0.000");
var interval: number = 0;
var passedTime: number = 0;

function startTimer(): void {
    if (interval) {
        return;
    }

    // we use 52 to trick the user into thinking the timer refreshes more times
    // than it actually does to reduce computation complexity
    interval = setInterval(() => {
        passedTime += 52;
        formattedTime.value = `${(passedTime / 1000).toFixed(3)}`;
    }, 52);
}

function stopTimer(): void {
    clearInterval(interval);
    interval = 0;
}

function resetTimer(): void {
    stopTimer();
    passedTime = 0;
    formattedTime.value = "0.000";
}

defineExpose({ startTimer, stopTimer, resetTimer });

</script>

<template>
    <div>Timer: {{ formattedTime }}</div>
</template>
