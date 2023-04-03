<script setup lang="ts">
import Timer from "@/components/visualizer/Timer.vue";
import { SettingsForm, SettingsSpeed } from "@/constants/interfaces";
import { ref } from "vue";

const props = defineProps(["algorithms", "activeForm", "algoRunning"]);
const emit = defineEmits(["start", "reset", "next"]);

const timer = ref();

const form = ref<SettingsForm>({
    algorithm: props.algorithms[Object.keys(props.algorithms)[0]],
    speed: 0
});

// function stopGame(): void {
//     timer.value.stopTimer();
//     props.algoRunning.value = false;
//     props.activeForm.value.algorithm = Object.keys(props.algorithms)[0];
//     props.activeForm.value.speed = 0;
// }

function startGame(): void {
    
    if (props.activeForm.speed !== SettingsSpeed.STEP_BY_STEP) {
        timer.value.startTimer();
    }

    emit("start", props.activeForm.value);
}

function resetGame(): void {
    timer.value.resetTimer();
    emit("reset");
}
//defineExpose({ stopGame });

</script>

<template>
    <div class="settingsMenu">
        <form>
            <ul>
                <p>Select Algorithm:</p>
                <li v-for="(v, k, i) in algorithms">
                    <input name="algorithms" :id="v.toString()" type="radio" :value="v" v-model="form.algorithm" :checked="i == 0 ? true : false"/>
                    <label name="algorithms" :for="v.toString()">{{
                        k
                    }}</label>
                </li>
            </ul>

            <ul>
                <p>Select Speed:</p>
                <li>
                    <input name="algospeed" id="1" type="radio" :value="SettingsSpeed.DEFAULT" v-model="form.speed" checked/>
                    <label for="1">1.0 X</label>
                </li>
                <li>
                    <input name="algospeed" id="1" type="radio" :value="SettingsSpeed.HALF" v-model="form.speed"/>
                    <label for="1">0.5 X</label>
                </li>
                <li>
                    <input name="algospeed" id="1" type="radio" :value="SettingsSpeed.STEP_BY_STEP" v-model="form.speed"/>
                    <label for="1">step-by-step</label>
                </li>
                <li>
                    <input name="algospeed" id="1" type="radio" :value="SettingsSpeed.REAL_TIME" v-model="form.speed"/>
                    <label for="1">Realtime</label>
                </li>

            </ul>
        </form>

        <Timer ref="timer" />
        <div class="buttonsGroup">
            <div v-if="activeForm.speed === SettingsSpeed.STEP_BY_STEP && algoRunning" class="menuButton" @click="$emit('next')">Next Step</div>
            <div v-else class="menuButton" @click="startGame()">Start</div>
            <!--<div class="menuButton" @click="timer.stopTimer()">Stop</div>-->
            <div class="menuButton" @click="resetGame()">Reset</div>
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
    grid-template-columns: auto auto;
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
