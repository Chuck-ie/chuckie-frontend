<script setup lang="ts">
import SettingsMenu from "@/components/visualizer/SettingsMenu.vue";
import Pathingfield from "@/components/visualizer/Pathingfield.vue";
</script>

<template>
    <SettingsMenu :algorithms="{ 0: 'Dijkstra', 1: 'A-Star (A*)' }" />
    <Pathingfield/>
</template>

<style scoped></style>
