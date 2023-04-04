<template>

    <ul>
        <li>Algorithm Visualizer</li>
        <ul>
            <li><router-link to="Projects/Pathfinding">Pathfinding Algorithms</router-link></li>
            <ul>
                <li>Dijkstra</li>
                <li>A-Star (A*)</li>
            </ul>
            <li><router-link to="Projects/Sorting">Sorting Algorithms</router-link></li>
            <ul>
                <li>Quicksort</li>
                <li>Selectionsort</li>
                <li>Bubblesort</li>
                <li>Radixsort</li>
            </ul>
        </ul>
    </ul>

</template>

<style scoped>
li {
    padding-top: 2px;
    padding-bottom: 2px;
}

ul {
    list-style: none;
}
</style>
