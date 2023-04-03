import { Cell, SettingsSpeed } from "./interfaces";

export class Colorizer {
 
    static gameGrid:Cell[][];
    static colorizerSpeed:number;
    static delay:number = 20;
    static stepCounter:number = 0;

    constructor(gameGrid:Cell[][], speed:number) {
        Colorizer.gameGrid = gameGrid;
        Colorizer.colorizerSpeed = speed;
    }

    public static increaseStepCounter(): void {
        Colorizer.stepCounter++;
    }
    
    public static async colorizeVisited(visited:Cell[]): Promise<void> {
        
        return new Promise<void>(async (resolve, reject) => {
            if (this.gameGrid == undefined) {
                reject("gameGrid is undefined");
            }

            for (var i = 0; i < visited.length; i++) {
                await this.#colorizeCell(visited[i], "visited");

                if (this.colorizerSpeed === SettingsSpeed.STEP_BY_STEP) {
                    await this.#awaitUserInput(Colorizer.stepCounter);
                }
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

    static async #awaitUserInput(currStep:number): Promise<void> {
        return new Promise<void>((resolve) => {
                setInterval(() => {
            
                if (currStep < Colorizer.stepCounter) {
                    resolve();
                }

            }, 100);
        })
    }
}
