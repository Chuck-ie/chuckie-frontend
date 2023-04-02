<script setup lang="ts">
import SettingsMenu from "@/components/visualizer/SettingsMenu.vue";
import Pathingfield from "@/components/visualizer/Pathingfield.vue";
import { ref } from "vue";
import { Colorizer } from "@/constants/Colorizer";

const settingsMenu = ref();
const pathingfield = ref();

</script>

<template>
    <SettingsMenu ref="settingsMenu" :algorithms="{ dijkstra: 'Dijkstra', astar: 'A-Star (A*)' }" @start="(form) => pathingfield.startVisualizer(form)" @reset="pathingfield.setGamesize()" @next="Colorizer.increaseStepCounter()"/>
    <Pathingfield ref="pathingfield" @finished="() => settingsMenu.stopGame()"/>
</template>

<style scoped></style>
