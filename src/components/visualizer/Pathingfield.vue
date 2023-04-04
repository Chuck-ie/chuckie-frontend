<script setup lang="ts">
import { ref } from 'vue';
import { Cell, PathingAlgorithms } from "@/constants/interfaces";
import { aStar, dijkstra } from '@/constants/PathingAlgos';
import { getStartCell } from '@/constants/PathingHelpers';
import { Colorizer } from '@/constants/Colorizer';
import { visualizerStore } from '@/stores/visualizer';

const emit = defineEmits(["finished"]);
window.addEventListener("resize", () => setGamesize());
window.addEventListener("mouseup", () => mouseDown.value = false);
const gameGrid = ref<Cell[][]>([[]]);
const mouseDown = ref<boolean>(false);
const draggedElement = ref<Cell | undefined>();
const gridWidth = ref<string>("");
const gridHeight = ref<string>("");
const gamestate = visualizerStore();

function setGamesize(): void {

    gameGrid.value = []
    Colorizer.setIsRunning(false);
    const availableWidth:number = window.innerWidth - Math.max(180, window.innerWidth * 0.15);
    const availableHeight:number = window.innerHeight * 0.8;
    
    const columns:number = Math.floor(availableWidth/40);
    const rows:number = Math.floor(availableHeight/40);

    gridWidth.value = columns * 40 + 'px';
    gridHeight.value = rows * 40 + 'px';

    for (var i = 0; i < rows; i++) {
        gameGrid.value.push([]);
        for (var j = 0; j < columns; j++) {

            const cell:Cell = {
                animation: "",
                pos: {
                    row: i,
                    col: j
                },
                isStart: false,
                isGoal: false,
                isObstacle: false,
                visited: false,
                distance: Infinity,
                predecessor: undefined
            }
            gameGrid.value[i].push(cell);
        }
    }

    const row:number = Math.floor(rows / 2);
    const col:number = Math.floor(columns / 3);
    gameGrid.value[row][col].isStart = true;
    gameGrid.value[row][col].distance = 0;

    gameGrid.value[row][2 * col].isGoal = true;
}

function startDragging(cell:Cell) {

    if (gamestate.getIsRunning) { return; }
    mouseDown.value = true;
    draggedElement.value = cell;
}

function applyDragging(cell:Cell) {
    
    if (!mouseDown.value) { return; }

    if (draggedElement.value!.isStart) {
        draggedElement.value!.isStart = false;
        draggedElement.value!.distance = Infinity;
        cell.isStart = true;
        cell.distance = 0;
        draggedElement.value! = cell;

    } else if (draggedElement.value!.isGoal) {
        draggedElement.value!.isGoal = false;
        cell.isGoal = true;
        draggedElement.value! = cell;

    } else if (!cell.isStart && !cell.isGoal && cell.isObstacle) {
        cell.isObstacle = false;

    } else if (!cell.isStart && !cell.isGoal) {
        cell.isObstacle = true;
    }
}

function toggleCell(cell:Cell) {

    if (gamestate.getIsRunning) { return; }

    if (cell.isStart || cell.isGoal) {
        return;
    } else if (cell.isObstacle) {
        cell.isObstacle = false;   
    } else {
        cell.isObstacle = true;
    }
}

async function startVisualizer(): Promise<void> {

    const start:Cell = getStartCell(gameGrid.value)!;
    let goal:Cell;
    let visited:Cell[];
    
    const t0 = performance.now();

    switch(gamestate.getActiveForm.algorithm) {
        case PathingAlgorithms.DIJKSTRA.value:
            [visited, goal] = dijkstra(gameGrid.value, start);
            break;

        case PathingAlgorithms.ASTAR.value:
            [visited, goal] = aStar(gameGrid.value, start);
            break;
    }

    const t1 = performance.now();
    console.log("dijkstra", t1 - t0)

    new Colorizer(gameGrid.value, gamestate.getActiveForm.speed);
    //const useTimeout:boolean = form.speed !== SettingsSpeed.REAL_TIME;

    await Colorizer.colorizeVisited(visited!);
    emit("finished");
    await Colorizer.colorizePath(goal!);
}

setGamesize();
defineExpose({startVisualizer, setGamesize });

</script>
<template>

    <table class="gamefield" :style="{width: gridWidth, height: gridHeight}" ondragstart="return false">
        <tr v-for="row in gameGrid">
            <td v-for="cell in row" @mousedown="startDragging(cell)" @mouseover="applyDragging(cell)" @click="toggleCell(cell)"
                :class="[cell.animation, {
                    'start': cell.isStart,
                    'goal': cell.isGoal,
                    'obstacle': cell.isObstacle,
                }]">
            </td>
        </tr>       
    </table>

</template>
<style scoped>

.gamefield {
    position: fixed;
    width: 83%;
    border-spacing: 0;
    height: 80%;
    left: max(180px, 15%);
    top: 62px;
}

td:last-child {
    border-right: 1px solid white;
}

tr:last-child td {
    border-bottom: 1px solid white;
}

td {
    width: 40px;
    height: 40px;
    padding: 0;
    margin: 0; 
    border: 1px solid white;
    border-right: 0;
    border-bottom: 0;
    background-color: grey;
}

.start {
    background-color: green;
}

.goal {
    background-color: red;
}

.obstacle {
    background-color: black;
}

.visitedColor {
    background-color: #085792;
}

.pathColor {
    background-color: #ffedbb;
}

@keyframes visitedAnimation {
    from {background-color: grey;}
    to {background-color: #085792;}
}

.visited {
    animation-name: visitedAnimation;
    animation-delay: 0s;
    animation-duration: 1s;
    animation-fill-mode: forwards;
}

@keyframes pathAnimation {
    from {background-color: #085792;}
    to {background-color: #ffedbb;}
}

.path {
    animation-name: pathAnimation;
    animation-delay: 0s;
    animation-duration: 1s;
    animation-fill-mode: forwards;
}

</style>
