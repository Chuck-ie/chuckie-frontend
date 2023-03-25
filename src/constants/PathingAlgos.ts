import { Cell } from "./interfaces";
import { getNeighbours, getStartCell } from "./PathingHelpers";

export function dijkstra(gameGrid:Cell[][], startCell:Cell): [Cell[][], Cell] {
    
    let currN:Cell = getStartCell(gameGrid)!;
    let neighbours:Cell[] = [...getNeighbours(gameGrid, currN)];

    while (neighbours.length > 0 && !currN.isGoal) {
        let bestN:Cell;
        let i:number = neighbours.indexOf(currN);

        if (i >= 0) neighbours.splice(i, 1);

        if (!currN.isStart) currN.visited = true;

        for (var n of neighbours) {
            if (bestN! === undefined) {
                bestN = n;
            }
            if (n.distance <= bestN.distance) {
                bestN = n;
            }
        }

        currN = bestN!;

        if (currN === undefined) break;
        neighbours.push(...getNeighbours(gameGrid, currN));
    }

    return [gameGrid, currN];
}

export function aStar(gameGrid:Cell[][], startCell:Cell): Cell[][] {

    return gameGrid;
}
