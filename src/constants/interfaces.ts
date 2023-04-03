
interface ArrayPos {
    row: number,
    col: number
}

export interface Cell {
    animation: {
        visited: boolean,
        path: boolean
    },
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

export interface ColorizerArgs {
    param: Cell | Cell[],
    callback: (param: Cell | Cell[]) => Promise<void>
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

export enum PathingAlgos {
    DIJKSTRA = "dijkstra",
    ASTAR = "astar"
}

export enum SortingAlgos {
    SELECTION_SORT = "selectionsort",
    BUBBLE_SORT = "bubblesort",
    INSERTION_SORT = "insertionsort",
    MERGE_SORT = "mergesort",
    QUICK_SORT = "quicksort",
    HEAP_SORT = "heapsort",
}

export enum SettingsSpeed {
    DEFAULT = 1,
    HALF = 2,
    STEP_BY_STEP = 3,
    REAL_TIME = 4
}
