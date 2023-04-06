<script setup lang="ts">
import Timer from "@/components/visualizer/Timer.vue";
import { SettingsForm, SettingsSpeed } from "@/constants/interfaces";
import { ref } from "vue";
import { visualizerStore } from "@/stores/visualizer";

const props = defineProps(["algorithms"]);
const emit = defineEmits(["start", "reset", "next"]);
const gamestate = visualizerStore();
const timer = ref();

const form = ref<SettingsForm>({
    algorithm: props.algorithms[Object.keys(props.algorithms)[0]].value,
    speed: SettingsSpeed.DEFAULT
});

function stopGame(): void {
    timer.value.stopTimer();
    gamestate.setIsRunning(false);
}

function startGame(): void {

    if (gamestate.getIsRunning) { return; }

    gamestate.setIsRunning(true);
    gamestate.setActiveForm(form.value);

    if (gamestate.getActiveForm.speed !== SettingsSpeed.STEP_BY_STEP) {
        timer.value.startTimer();
    }

    emit("start");
}

function resetGame(): void {
    timer.value.resetTimer();
    gamestate.setIsRunning(false);
    emit("reset");
}

defineExpose({ stopGame });

</script>

<template>
    <form class="settingsMenu flexRow" @submit.prevent>

        <select class="flexItem" v-model="form.algorithm">
            <option v-for="(o, _, i) in algorithms" :value="o.value" :key="i">
                {{ o.name }}
            </option>
        </select>

        <select class="flexItem" v-model="form.speed">
            <option :value="SettingsSpeed.DEFAULT">1.0 X</option>
            <option :value="SettingsSpeed.HALF">0.5 X</option>
            <option :value="SettingsSpeed.STEP_BY_STEP">Step-by-step</option>
            <option :value="SettingsSpeed.REAL_TIME">Realtime</option>
        </select>

        <Timer class="flexItem" ref="timer"/> 

        <button
            v-if="gamestate.getActiveForm.speed === SettingsSpeed.STEP_BY_STEP && gamestate.getIsRunning"
            type="submit"
            class="flexItem"
            @click="$emit('next')">
            Next Step
        </button>
            
        <button 
            v-else
            type="submit" 
            class="flexItem"
            @click="startGame()">
            Start
        </button>

        <button 
            type="submit"
            class="flexItem"
            @click="resetGame()">
            Reset
        </button>
        
    </form>
</template>

<style scoped>

button {
    all: unset;
}

button:hover {
    background-color: #000000;
    cursor: pointer;
}

.settingsMenu {
    border: 1px solid white;
    width: calc(100% - 2px);
}

.flexRow {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
}

.flexItem {
    flex: 1;
    background: none;
    border-left: 1px solid white;
    font-family: inherit;
    font-size: inherit;
    margin-left: -1px;
    padding-top: 5px; 
    padding-bottom: 5px; 
    text-align: center;
    background-color: inherit;
}

select {
    background-color: inherit;
    cursor: pointer;
}

select option {
    background-color: #615b5b;
}

select:focus {
    outline: none;
}

</style>
