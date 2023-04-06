<script setup lang="ts">
import CellDescription from './pathing/CellDescription.vue';
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

        <ul class="tooltips">
            <li>Drag start/goal cells to new positions by holding the left mouse button.</li>
            <li>Add obstacles by holding the left mouse button over an empty cell.</li>
            <li>Remove obstacles by holding the left alt key while adding an obstacle.</li>
            <li>Click on the "Clear Grid" button to remove all obstacles and paths.</li>
            <li>Choose a different algorithm from the dropdown menu to see different pathfinding techniques in action.</li>
            <li>With the "Realtime" option enabled, start the algorithm once and then drag the start and goal cells to see the visualization update in real time.</li>
        </ul>
    </div>
</template>

<style scoped>

.legendContainer {
    display: flex;
    border: 1px solid var(--border-color);
    margin-top: -1px;
    padding-left: 5px;
    padding-right: 5px;
    background-color: var(--header-color)
}

.cellDescriptions {
    min-width: 220px;
    padding-top: 5px;
    padding-right: 10px;
}

.tooltips {
    flex: 1;
    padding-top: 5px;
    padding-left: 25px;
    margin: 0;
    border-left: 1px solid var(--border-color);
}

</style>
