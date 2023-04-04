<script setup lang="ts">
import { ref } from 'vue';
import { Cell, PathingAlgorithms, SettingsSpeed } from "@/constants/interfaces";
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
    //const availableWidth:number = window.innerWidth - Math.max(180, window.innerWidth * 0.15);
    const availableHeight:number = window.innerHeight * 0.8;
    
    const columns:number = Math.floor(window.innerWidth/40);
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

function softresetGamegrid(): void {
    
    for (var i = 0; i < gameGrid.value.length; i++) {
        for (var j = 0; j < gameGrid.value[i].length; j++) {
            gameGrid.value[i][j].animation = "";
            gameGrid.value[i][j].visited = false;
            gameGrid.value[i][j].distance = gameGrid.value[i][j].isStart ? 0 : Infinity;
            gameGrid.value[i][j].predecessor = undefined;
        }
    }
}

function startDragging(cell:Cell) {

    if (gamestate.getIsRunning) { return; }
    mouseDown.value = true;
    draggedElement.value = cell;
}

function applyDragging(cell:Cell) {
    
    if (!mouseDown.value) { return; }

    if (draggedElement.value!.isStart) {
        if (!cell.isObstacle && !cell.isGoal) {
            draggedElement.value!.isStart = false;
            draggedElement.value!.distance = Infinity;
            cell.isStart = true;
            cell.distance = 0;
            draggedElement.value! = cell;
        }

        if (gamestate.getActiveForm.speed === SettingsSpeed.REAL_TIME) {
            softresetGamegrid();
            startVisualizer();
        }
        return;
    }

    if (draggedElement.value!.isGoal) {

        if (!cell.isObstacle && !cell.isStart) {
            draggedElement.value!.isGoal = false;
            cell.isGoal = true;
            draggedElement.value! = cell;
        }
        return;
    }

    if (!draggedElement.value!.isStart && !draggedElement.value!.isGoal) {

        if (!cell.isStart && !cell.isGoal) {
            cell.isObstacle = !cell.isObstacle;
        }
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

    switch(gamestate.getActiveForm.algorithm) {
        case PathingAlgorithms.DIJKSTRA.value:
            [visited, goal] = dijkstra(gameGrid.value, start);
            break;

        case PathingAlgorithms.ASTAR.value:
            [visited, goal] = aStar(gameGrid.value, start);
            break;
    }

    new Colorizer(gameGrid.value, gamestate.getActiveForm.speed);

    Colorizer.setIsRunning(true);
    await Colorizer.colorizeVisited(visited!);
    emit("finished");
    await Colorizer.colorizePath(goal!);
}

setGamesize();
defineExpose({startVisualizer, setGamesize });

</script>
<template>

    <table class="gamefield" ondragstart="return false">
        <tr v-for="row in gameGrid">
            <td v-for="cell in row" 
                @mousedown="startDragging(cell)" 
                @mouseover="applyDragging(cell)" 
                @click="toggleCell(cell)"
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
    position: relative;
    width: 100%;
    margin-right: 5px;
    border-spacing: 0;
    /*height: 80%;*/
    margin-top: -1px;
}

td:last-child {
    border-right: 1px solid white;
}

tr:last-child td {
    border-bottom: 1px solid white;
}

td {
    aspect-ratio: 1;
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
