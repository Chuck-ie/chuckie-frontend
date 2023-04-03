import { Cell, Neighbours } from "./interfaces";

export function getNeighbours(gameGrid:Cell[][], cell:Cell): Cell[] {
    
    const neighbourOffsets: Neighbours = {
        UP: { X: -1, Y: 0 },
        DOWN: { X: 1, Y: 0 },
        LEFT: { X: 0, Y: -1 },
        RIGHT: { X: 0, Y: 1 },
        UP_LEFT: { X: -1, Y: -1 },
        UP_RIGHT: { X: -1, Y: 1 },
        DOWN_LEFT: { X: 1, Y: -1 },
        DOWN_RIGHT: { X: 1, Y: 1 },
    }; 
    let neighbours:Cell[] = [];
    
    for (var offset of Object.values(neighbourOffsets)) {

        const offsetX:number = cell.pos.row + offset.X;
        const offsetY:number = cell.pos.col + offset.Y;

        if (offsetX < 0 || offsetX >= gameGrid.length) continue;

        if (offsetY < 0 || offsetY >= gameGrid[0].length) continue;

        const currNeighbour:Cell = gameGrid[offsetX][offsetY];
        const predecessor:Cell = cell;

        if (!currNeighbour.visited && !currNeighbour.isObstacle && !currNeighbour.isStart && currNeighbour.distance === Infinity) {

            if (offset.X !== 0 && offset.Y !== 0) {
                currNeighbour.distance = predecessor.distance + 14;
            } else {
                currNeighbour.distance = predecessor.distance + 10;
            }
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

