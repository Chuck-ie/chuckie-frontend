<script setup lang="ts">
import { ref } from 'vue';
import { Cell, SettingsForm} from "@/constants/interfaces";
import { aStar, dijkstra } from '@/constants/PathingAlgos';
import { getStartCell } from '@/constants/PathingHelpers';

defineExpose({startVisualizer, setGamesize});
window.addEventListener("resize", () => setGamesize());
window.addEventListener("mouseup", () => mouseDown.value = false);
const gameGrid = ref<Cell[][]>([[]]);
const mouseDown = ref<boolean>(false);
const draggedElement = ref<Cell | undefined>();

function setGamesize(): void {

    algoRunning = false;
    gameGrid.value = []
    const availableWidth:number = window.innerWidth - Math.max(180, window.innerWidth * 0.15);
    const availableHeight:number = window.innerHeight * 0.8;
    
    const columns:number = Math.floor(availableWidth/20);
    const rows:number = Math.floor(availableHeight/20);

    for (var i = 0; i < rows; i++) {
        gameGrid.value.push([]);
        for (var j = 0; j < columns; j++) {

            const cell:Cell = {
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

    mouseDown.value = true;
    draggedElement.value = cell;
}

function applyDragging(cell:Cell) {
    
    if (!mouseDown.value) { return; }

    if (draggedElement.value!.isStart) {
        draggedElement.value!.isStart = false;
        cell.isStart = true;
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

    if (cell.isStart || cell.isGoal) {
        return;
    } else if (cell.isObstacle) {
        cell.isObstacle = false;   
    } else {
        cell.isObstacle = true;
    }
}

var algoRunning:boolean = false;
function startVisualizer(form:SettingsForm): void {
    
    if (algoRunning) return; 

    
    algoRunning = true;
    const startCell:Cell = getStartCell(gameGrid.value)!;
    let goalCell:Cell;
    let result:Cell[][];

    switch(form.algorithm) {
        case("dijkstra"):
            [result, goalCell] = dijkstra(gameGrid.value, startCell);
            console.log(result);
            console.log(goalCell);
            console.log("dijkstra");
            break;
        case("astar"):
            result = aStar(gameGrid.value, startCell);
            console.log("astar");
            break;
    }
}

setGamesize();

</script>
<template>

    <table class="gamefield" ondragstart="return false">
        <tr v-for="row in gameGrid">
            <td v-for="cell in row" @mousedown="startDragging(cell)" @mouseover="applyDragging(cell)" @click="toggleCell(cell)"
                :class="{
                'start': cell.isStart,
                'goal': cell.isGoal,
                'obstacle': cell.isObstacle,
                'visited': cell.visited}">
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
    width: 20px;
    height: 20px;
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

@keyframes visitedCell {
    from {background-color: grey;}
    to {background-color: #085792;}
}

.visited {
    animation-delay: var(--delay);
    animation: visitedCell 1s ease-in;
    animation-duration: 1s;
    background-color: #085792;
}

</style>
