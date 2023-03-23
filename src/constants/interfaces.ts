
export interface SelectedCell {
    element: HTMLElement,
    isStart: boolean,
    isGoal: boolean
}

export interface Point {
    x: number,
    y: number
}

export interface Cell {
    visited: string,
    distance: number,
    predecessor: Cell
}
