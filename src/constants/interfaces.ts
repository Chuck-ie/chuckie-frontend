
interface ArrayPos {
    row: number,
    col: number
}

export interface Cell {
    pos: ArrayPos,
    delayVisited: number,
    delayPath: number,
    isStart: boolean,
    isGoal: boolean,
    isObstacle: boolean,
    isPath: boolean,
    visited: boolean,
    distance: number,
    predecessor: Cell | undefined
}

export interface SettingsForm {
    algorithm: string,
    speed: number
}
