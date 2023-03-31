
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
    callback: (param:Cell | Cell[]) => Promise<void>
}
