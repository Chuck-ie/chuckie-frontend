
interface ArrayPos {
    row: number,
    col: number
}

export interface Cell {
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
