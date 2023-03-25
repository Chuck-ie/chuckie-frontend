<script setup lang="ts">
import SettingsMenu from "@/components/visualizer/SettingsMenu.vue";
import Pathingfield from "@/components/visualizer/Pathingfield.vue";
import { ref } from "vue";

const pathingfield = ref();
</script>

<template>
    <SettingsMenu :algorithms="{ dijkstra: 'Dijkstra', astar: 'A-Star (A*)' }" @start="(form) => pathingfield.startVisualizer(form)" @reset="pathingfield.setGamesize()"/>
    <Pathingfield ref="pathingfield"/>
</template>

<style scoped></style>
