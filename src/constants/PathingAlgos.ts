import { DistanceCalculator } from "./DistanceCalculator";
import { Cell } from "./interfaces";
import { getGoalCell, getNeighbours } from "./PathingHelpers";

export function dijkstra(gameGrid: Cell[][], start: Cell): [Cell[], Cell] {

    let currN: Cell = start;
    let neighbours: Cell[] = [...getNeighbours(gameGrid, currN)];
    let visited: Cell[] = [];

    while (neighbours.length > 0 && !currN.isGoal) {

        let bestN: Cell;
        // remove current node
        let i: number = neighbours.indexOf(currN);
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

export function aStar(gameGrid: Cell[][], start: Cell): [Cell[], Cell] {

    let currN: Cell = start;
    let neighbours: Cell[] = [...getNeighbours(gameGrid, currN)];
    let visited: Cell[] = [];
    let goal: Cell = getGoalCell(gameGrid);

    while (neighbours.length > 0 && !currN.isGoal) {
        
        let bestN: Cell;

        if (!currN.isStart) {
            currN.visited = true;
            visited.push(currN);
        }

        for (var n of neighbours.filter(n => !n.visited)) {
            if (bestN! === undefined) {
                bestN = n;
            }

            let nhcost:number, nfcost:number, bestNhcost:number, bestNfcost:number;

            [nhcost, bestNhcost] = [
                DistanceCalculator.calculateHcost(n.pos.row, n.pos.col, goal.pos.row, goal.pos.col),
                DistanceCalculator.calculateHcost(bestN.pos.row, bestN.pos.col, goal.pos.row, goal.pos.col)
            ];

            [nfcost, bestNfcost] = [
                nhcost + n.distance,
                bestNhcost + bestN.distance
            ];

            if (nfcost === bestNfcost && nhcost < bestNhcost) {
                bestN = n
            } else if (nfcost < bestNfcost) {
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
