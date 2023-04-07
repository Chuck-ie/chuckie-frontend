
export class DistanceCalculator {

    public static calculateHcost(currRow:number, currCol:number, goalRow:number, goalCol:number): number {
        
        let diffRow:number, diffCol:number, lower:number, higher:number;

        [diffRow, diffCol] = [
            Math.abs(currRow - goalRow),
            Math.abs(currCol - goalCol)
        ];

        [lower, higher] = [
            Math.min(diffRow, diffCol),
            Math.max(diffRow, diffCol)
        ];

        // = 14a + 10(b - a)
        // = 14a + 10b - 4a
        // = 4a + 10b
        return 4 * lower + 10 * higher;
    }
}
