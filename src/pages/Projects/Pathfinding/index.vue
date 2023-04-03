<script setup lang="ts">
import SettingsMenu from "@/components/visualizer/SettingsMenu.vue";
import Pathingfield from "@/components/visualizer/Pathingfield.vue";
import { ref } from "vue";
import { Colorizer } from "@/constants/Colorizer";
import { PathingAlgos } from "@/constants/interfaces";

const settingsMenu = ref();
const pathingfield = ref();

</script>

<template>
    <SettingsMenu ref="settingsMenu" :algorithms="{ 'Dijkstra': PathingAlgos.DIJKSTRA, 'A-Star (A*)': PathingAlgos.ASTAR }" @start="(form) => pathingfield.startVisualizer(form)" @reset="pathingfield.setGamesize()" @next="Colorizer.increaseStepCounter()"/>
    <Pathingfield ref="pathingfield" @finished="() => settingsMenu.stopGame()"/>
</template>

<style scoped></style>
