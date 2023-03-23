<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from "vue";
import { SelectedCell, Point, Cell} from "@/constants/interfaces";

window.addEventListener("resize", () => setGamesize());
window.addEventListener("mouseup", () => isDragging.value = false);
const gameGrid:Ref<Array<Cell[]>> = ref([[]]);
const startCellPt:Ref<Point> = ref({});
const goalCellPt:Ref<Point> = ref({});
const isDragging:Ref<boolean> = ref(false);
const draggedElement:Ref<SelectedCell> = ref({});

function setGamesize(): void {

    gameGrid.value = []
    const availableWidth:number = window.innerWidth - Math.max(180, window.innerWidth * 0.15);
    const availableHeight:number = window.innerHeight * 0.8;
    
    const columns:number = Math.floor(availableWidth/20);
    const rows:number = Math.floor(availableHeight/20);

    for (var i = 0; i < rows; i++) {
        gameGrid.value.push([]);
        for (var j = 0; j < columns; j++) {

            const cell:Cell = {
                "visited": false,
                "distance": Infinity,
                "predecessor": undefined
            }
            gameGrid.value[i].push(cell);
        }
    }

    startCellPt.value.x = Math.floor(rows / 2);
    startCellPt.value.y = Math.floor(columns / 3);

    goalCellPt.value.x = Math.floor(rows / 2);
    goalCellPt.value.y = Math.floor(2 * columns / 3);

    gameGrid.value[startCellPt.value.x][startCellPt.value.y].distance = 0;
}

function startDragging(evt:any) {

    isDragging.value = true;
    const targetCell:HTMLElement = evt.target;

    draggedElement.value.element = targetCell;
    draggedElement.value.isStart = targetCell.classList.contains('start');
    draggedElement.value.isGoal = targetCell.classList.contains('goal');
}

function applyDragging(evt:any, i:number, j:number) {
    
    if (!isDragging.value) { return; }

    const draggingStart:boolean = draggedElement.value.isStart;
    const draggingGoal:boolean = draggedElement.value.isGoal;
    const isStart:boolean = evt.target.classList.contains("start");
    const isGoal:boolean = evt.target.classList.contains("goal");
    const isObstacle:boolean = evt.target.classList.contains("obstacle");

    if (draggingStart) {
        startCellPt.value.x = i;
        startCellPt.value.y = j;
    } else if (draggingGoal) {
        goalCellPt.value.x = i;
        goalCellPt.value.y = j;
    } else if (!isStart && !isGoal && isObstacle) {
        evt.target.classList.remove("obstacle");
    } else if (!isStart && !isGoal) {
        evt.target.classList.add("obstacle");
    }
}

function toggleCell(evt:any) {

    const isStart:boolean = evt.target.classList.contains("start");
    const isGoal:boolean = evt.target.classList.contains("goal");
    const isObstacle:boolean = evt.target.classList.contains("obstacle");
    
    if (isStart || isGoal) {
        return;
    } else if (isObstacle) {
        evt.target.classList.remove("obstacle");
    } else {
        evt.target.classList.add("obstacle");
    }
}

setGamesize();

</script>
<template>

    <table class="gamefield" ondragstart="return false" @mousedown="startDragging">
        <tr v-for="(row, i) in gameGrid">
            <td v-for="(cell, j) in row" @mouseover="applyDragging($event, i, j)" @click="toggleCell"
                :class="{
                    'goal': i == goalCellPt.x && j == goalCellPt.y,
                    'start': i == startCellPt.x && j == startCellPt.y,
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

.visited {

}
</style>
