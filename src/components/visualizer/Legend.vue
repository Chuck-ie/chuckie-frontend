<script setup lang="ts">
import CellDescription from './pathing/CellDescription.vue';
//import CellDescription from "@/components/visualizer/CellDescription.vue";
</script>

<template>
    <div class="legendContainer">

        <div class="cellDescriptions">
            <CellDescription :color-variable="'var(--start-color)'" :description-text="'Start Cell'"/>
            <CellDescription :color-variable="'var(--goal-color)'" :description-text="'Goal Cell'"/>
            <CellDescription :color-variable="'var(--path-color)'" :description-text="'Path Cell'"/>
            <CellDescription :color-variable="'var(--obstacle-color)'" :description-text="'Obstacle Cell'"/>
            <CellDescription :color-variable="'var(--visited-color)'" :description-text="'Visited Cell'"/>
        </div>

    </div>
</template>

<style scoped>

.legendContainer {
    align-items: center;
    position: relative;
    width: calc(100% - 12px);
    height: 100%;        
    background-color: grey;
    border: 1px solid var(--border-color);
    margin-top: -1px;
    padding-top: 5px;
    padding-left: 5px;
    padding-right: 5px;
    background-color: var(--header-color)
}

.cellDescriptions {
    display: flex;
    flex-wrap: wrap;
    width: calc(40%);
}

</style>
