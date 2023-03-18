<script setup lang="ts">
import Timer from "@/components/visualizer/Timer.vue";
import { ref } from "vue";

defineProps(["algorithms"]);

const timer = ref();
</script>

<template>
    <div class="settingsMenu">
        <form>
            <ul>
                <p>Select Algorithm:</p>
                <li v-for="(algo, i) in algorithms">
                    <input name="algorithms" :id="i.toString()" type="radio" />
                    <label name="algorithms" :for="i.toString()">{{
                        algo
                    }}</label>
                </li>
            </ul>

            <ul>
                <p>Select Speed:</p>
                <li>
                    <input name="algospeed" id="1" type="radio" />
                    <label for="1">1.0 X</label>
                </li>
                <li>
                    <input name="algospeed" id="1" type="radio" />
                    <label for="1">0.5 X</label>
                </li>
                <li>
                    <input name="algospeed" id="1" type="radio" />
                    <label for="1">step-by-step</label>
                </li>
            </ul>
        </form>

        <Timer ref="timer" />
        <div class="buttonsGroup">
            <div class="menuButton" @click="timer.startTimer()">Start</div>
            <div class="menuButton" @click="timer.stopTimer()">Stop</div>
            <div class="menuButton" @click="timer.resetTimer()">Reset</div>
        </div>
    </div>
</template>

<style scoped>
.settingsMenu {
    border: 1px solid;
    width: 12%;
    min-width: 150px;
    padding: 5px;
}

.buttonsGroup {
    display: inline-grid;
    grid-template-columns: auto auto auto;
    width: 100%;
}

.menuButton {
    text-align: center;
    border: 1px solid;
    text-align: center;
    padding-top: 3px;
    padding-bottom: 1px;
    user-select: none;
}

.menuButton:hover {
    background-color: #000000;
    cursor: pointer;
}

ul {
    list-style: none;
    margin: 0;
    padding-left: 5px;
}

li {
    padding-left: 10px;
}

p {
    margin-top: 10px;
    margin-bottom: 0;
    font-style: italic;
}
</style>
