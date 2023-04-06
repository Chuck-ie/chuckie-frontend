<script setup lang="ts">
import SettingsMenu from "@/components/visualizer/SettingsMenu.vue";
import Pathingfield from "@/components/visualizer/Pathingfield.vue";
import Legend from "@/components/visualizer/Legend.vue";
import { ref } from "vue";
import { Colorizer } from "@/constants/Colorizer";
import { PathingAlgorithms } from "@/constants/interfaces";

const settingsMenu = ref();
const pathingfield = ref();

</script>

<template>

    <SettingsMenu 
        ref="settingsMenu" 
        :algorithms="PathingAlgorithms" 
        @start="() => pathingfield.startVisualizer()" 
        @reset="pathingfield.setGamesize()" 
        @next="Colorizer.increaseStepCounter()"/>

    <Pathingfield 
        ref="pathingfield" 
        @finished="() => settingsMenu.stopGame()"/>

    <Legend/>

</template>

<style scoped></style>
