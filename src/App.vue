<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
</script>

<template>
    <Navbar/>
    <router-view/>
</template>

<style>
body {
    background-color: #615B5B;
}

* {
    font-family: 'Courier New', Courier, monospace;
    color: white;
}
</style>