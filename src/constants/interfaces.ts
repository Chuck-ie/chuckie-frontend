
interface ArrayPos {
    row: number,
    col: number
}

export interface Cell {
    animation: Animations | "",
    pos: ArrayPos,
    isStart: boolean,
    isGoal: boolean,
    isObstacle: boolean,
    visited: boolean,
    distance: number,
    predecessor: Cell | undefined
}

export interface SettingsForm {
    algorithm: string,
    speed: number
}

export interface Neighbours {
    UP: {X:number, Y:number},
    DOWN: {X:number, Y:number},
    LEFT: {X:number, Y:number},
    RIGHT: {X:number, Y:number}
    UP_LEFT: {X:number, Y:number},
    UP_RIGHT: {X:number, Y:number},
    DOWN_LEFT: {X:number, Y:number},
    DOWN_RIGHT: {X:number, Y:number}
}

export interface VisualizerState {
    isRunning: boolean,
    activeForm: SettingsForm
}

interface Algorithm {
    name: string,
    value: string
}

interface PathingAlgos {
    DIJKSTRA: Algorithm,
    ASTAR: Algorithm,
}

interface SortingAlgos {
    SELECTION_SORT: Algorithm,
    BUBBLE_SORT: Algorithm,
    INSERTION_SORT: Algorithm,
    MERGE_SORT: Algorithm,
    QUICK_SORT: Algorithm,
    HEAP_SORT: Algorithm
}

export const PathingAlgorithms: PathingAlgos = {
    DIJKSTRA: {
        name: "Dijkstra",
        value: "dijkstra"
    },
    ASTAR: {
        name: "A-Star (A*)",
        value: "astar"
    }
}

export const SortingAlgorithms: SortingAlgos = {
    SELECTION_SORT: {
        name: "Selection Sort",
        value: "selectionSort"
    },
    BUBBLE_SORT: {
        name: "Bubble Sort",
        value: "bubbleSort"
    },
    INSERTION_SORT: {
        name: "Insertion Sort",
        value: "insertionSort"
    },
    MERGE_SORT: {
        name: "Merge Sort",
        value: "mergeSort"
    },
    QUICK_SORT: {
        name: "Quick Sort",
        value: "quickSort"
    },
    HEAP_SORT: {
        name: "Heap Sort",
        value: "heapSort"
    }
}

export enum SettingsSpeed {
    DEFAULT = 1,
    HALF = 2,
    STEP_BY_STEP = 3,
    REAL_TIME = 4
}

export enum Animations {
    VISITED_DELAYED = "visited",
    VISITED_REALTIME = "visitedColor",
    PATH_DELAYED = "path",
    PATH_REALTIME = "pathColor",
}
