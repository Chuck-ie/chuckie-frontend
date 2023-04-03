<script setup lang="ts">
import SettingsMenu from "@/components/visualizer/SettingsMenu.vue";
import Pathingfield from "@/components/visualizer/Pathingfield.vue";
import { ref } from "vue";
import { Colorizer } from "@/constants/Colorizer";
import { PathingAlgos } from "@/constants/interfaces";

const settingsMenu = ref();
const pathingfield = ref();

console.log("hi");
console.log(pathingfield.value.activeForm);

</script>

<template>
    <Pathingfield 
        ref="pathingfield" 
        @finished="() => settingsMenu.stopGame()"/>

    <SettingsMenu 
        ref="settingsMenu" 
        :active-form="pathingfield.activeForm"
        :algo-running="pathingfield.algoRunning"
        :algorithms="{ 'Dijkstra': PathingAlgos.DIJKSTRA, 'A-Star (A*)': PathingAlgos.ASTAR }" 
        @start="(form) => pathingfield.startVisualizer(form)" 
        @reset="pathingfield.setGamesize()" 
        @next="Colorizer.increaseStepCounter()"/>


</template>

<style scoped></style>
