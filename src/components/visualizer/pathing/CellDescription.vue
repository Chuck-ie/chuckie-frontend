<script setup lang="ts">
defineProps(["colorVariable", "descriptionText"])

</script>

<template>

    <div class="flexContainer">
        <div class="description">{{ descriptionText }}:</div>
        <div class="icon">
            <span :style="{backgroundColor: colorVariable}"></span>
        </div>
    </div>

</template>

<style scoped>

.flexContainer {
    display: flex;
    align-items: center;
}

.description {
    width: calc(100% - 20px);
}

span {
    display: inline-block;
    width: 20px;
    height: 20px;
}

</style>
