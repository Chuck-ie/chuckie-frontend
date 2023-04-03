import { Animations, Cell, SettingsSpeed } from "./interfaces";

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

                if (this.colorizerSpeed === SettingsSpeed.REAL_TIME) {
                    this.#colorizeCell(visited[i], "VISITED_REALTIME", false);
                    continue;
                }

                await this.#colorizeCell(visited[i], "VISITED_DELAYED", true);

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

                if (this.colorizerSpeed === SettingsSpeed.REAL_TIME) {
                    this.#colorizeCell(currN.predecessor, "PATH_REALTIME", false);
                    currN = currN.predecessor;
                    continue;
                }

                await this.#colorizeCell(currN.predecessor, "PATH_DELAYED", true);
                currN = currN.predecessor;
            }

            resolve();
        })
    }

    static async #colorizeCell(cell:Cell, animation: keyof typeof Animations, useTimeout:boolean): Promise<void> {

        return new Promise<void>((resolve) => {
            if (useTimeout) {
                setTimeout(() => {
                    this.#colorizeCell(cell, animation, false);
                    resolve();
                }, this.delay / this.colorizerSpeed);
                return;
            }

            Colorizer.gameGrid[cell.pos.row][cell.pos.col].animation = Animations[animation];
            resolve();
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
