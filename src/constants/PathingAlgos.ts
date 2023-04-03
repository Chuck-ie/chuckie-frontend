import { Cell } from "./interfaces";
import { getNeighbours } from "./PathingHelpers";

export function dijkstra(gameGrid:Cell[][], start:Cell): [Cell[], Cell] {
    
    let currN:Cell = start;
    let neighbours:Cell[] = [...getNeighbours(gameGrid, currN)];
    let visited:Cell[] = [];

    while (neighbours.length > 0 && !currN.isGoal) {

        let bestN:Cell;
        // remove current node
        let i:number = neighbours.indexOf(currN);
        if (i >= 0) neighbours.splice(i, 1);

        if (!currN.isStart) {
            currN.visited = true;
            visited.push(currN);
        }

        for (var n of neighbours) {
            if (bestN! === undefined) {
                bestN = n;
            }
            if (n.distance < bestN.distance) {
                bestN = n;
            }
        }

        if (bestN! !== undefined) {
            currN = bestN;
        } else {
            break;
        }

        if (currN === undefined) break;
        neighbours.push(...getNeighbours(gameGrid, currN));
    }

    return [visited, currN];
}

export function aStar(gameGrid:Cell[][], start:Cell): [Cell[], Cell] {

    let currN:Cell = start;
    let visited:Cell[] = [];

    return [visited, currN];
}
