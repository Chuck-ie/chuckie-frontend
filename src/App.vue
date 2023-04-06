<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
</script>

<template>
    <Navbar />
    <router-view />
</template>

<style>
@import url("@/assets/colors.css");

body {
    background-color: #615b5b;
}

* {
    font-family: "Courier New", Courier, monospace;
    color: white;
}
</style>
