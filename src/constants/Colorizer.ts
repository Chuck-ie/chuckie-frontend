import { Cell } from "./interfaces";

export class Colorizer {
 
    static gameGrid:Cell[][];
    static colorizerSpeed:number;
    static delay:number = 20;

    constructor(gameGrid:Cell[][], speed:number) {
        Colorizer.gameGrid = gameGrid;
        Colorizer.colorizerSpeed = speed;
    }

    public static async colorizeVisited(visited:Cell[]): Promise<void> {
        
        return new Promise<void>(async (resolve, reject) => {
            if (this.gameGrid == undefined) {
                reject("gameGrid is undefined");
            }

            for (var i = 0; i < visited.length; i++) {
                await this.#colorizeCell(visited[i], "visited");
            }

            resolve();
        })
    }

    public static async colorizePath(currN:Cell): Promise<void> {
        
        return new Promise<void>(async (resolve, reject) => {
            if (this.gameGrid == undefined) {
                reject("gameGrid is undefined");
            }

            while (currN.predecessor !== undefined && !currN.predecessor.isStart) {
                await this.#colorizeCell(currN.predecessor, "path");
                currN = currN.predecessor;
            }

            resolve();
        })
    }

    static async #colorizeCell(cell:Cell, option:string): Promise<void> {
        
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                switch(option) {
                    case "path":
                        Colorizer.gameGrid[cell.pos.row][cell.pos.col].animation.path = true;
                        break;

                    case "visited":
                        Colorizer.gameGrid[cell.pos.row][cell.pos.col].animation.visited = true;
                        break;
                }
                resolve();

            }, this.delay);
        })
    }
}
