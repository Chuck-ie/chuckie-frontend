import { Cell } from "./interfaces";

export function getNeighbours(gameGrid:Cell[][], cell:Cell): Cell[] {
    
    const neighbourOffsets:[number, number][] = [[-1, 0], [0, 1], [1, 0], [0, -1]];
    let neighbours:Cell[] = [];
    
    for (var [x, y] of neighbourOffsets) {

        const offsetX:number = cell.pos.row + x;
        const offsetY:number = cell.pos.col + y;

        if (offsetX < 0 || offsetX >= gameGrid.length) continue;

        if (offsetY < 0 || offsetY >= gameGrid[0].length) continue;

        const currNeighbour:Cell = gameGrid[offsetX][offsetY];
        const predecessor:Cell = cell;

        if (!currNeighbour.visited && !currNeighbour.isObstacle && !currNeighbour.isStart && currNeighbour.distance === Infinity) {
            currNeighbour.distance = predecessor.distance + 1;
            currNeighbour.predecessor = predecessor;
            neighbours.push(currNeighbour);
        }
    }

    return neighbours;
}


export function getStartCell(gameGrid:Cell[][]): Cell {

    let startCell = {} as Cell;

    for (var i = 0; i < gameGrid.length; i++) {
        for (var j = 0; j < gameGrid[i].length; j++) {
            if (gameGrid[i][j].isStart) {
                startCell = gameGrid[i][j];
                return startCell;
            }
        }
    }

    return startCell;
}

export function colorizePath(cell:Cell | undefined, delay:number): void {

    if (cell === undefined || cell.isStart) return;

    cell.delayPath = delay;
    console.log(delay);
    cell.isPath = true;

    colorizePath(cell.predecessor, delay + 80);
}

