<script setup lang="ts">
defineProps(["colorVariable", "descriptionText"])

</script>

<template>

    <div class="flexContainer">
        <div class="flexItem description">{{ descriptionText }}:</div>
        <div class="flexItem icon">
            <span :style="{backgroundColor: colorVariable}"></span>
        </div>
    </div>

</template>

<style scoped>

.flexContainer {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    width: 50%;
    min-width: 200px;
    height: 25px;
    align-items: center;
    justify-content: center;
}

.flexItem {
    display: inline-block;
    margin: 0;
}

.description {
    width: 80%;
}

.icon {
    width: 20%;
}

span {
    display: inline-block;
    width: 20px;
    height: 20px;
}

</style>
