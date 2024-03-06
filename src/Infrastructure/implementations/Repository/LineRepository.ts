import { ILineRepository } from "./../../../domainService/ILine.js";
import { IVector2D } from "../../../domain/IVector2D.js";
import { ILine } from "../../../domain/ILine.js";

export class LineRepository implements ILineRepository {
    private Lines: ILine[];
    constructor() {
        this.Lines = [];
    }

    CreateLine(id: string,
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        angle: number,
        color: string,
        velocity: number
    ): void {
        const Line: ILine = {
            id: id,
            Spoint: { x: x1, y: y1 } as IVector2D,
            Epoint: { x: x2, y: y2 } as IVector2D,
            color: color,
            velocity: velocity,
            angle: angle

        }
        this.Lines.push(Line);
    }
    getAllLines(): ILine[] {
        return this.Lines;
    }
    getLineById(id: string): ILine | undefined {
        return this.Lines.find(line => line.id === id) ;
    }
    removeLine(line: ILine): void {
        this.Lines.splice(this.Lines.indexOf(line), 1)
    }
    SetLines(lines: ILine[]): void {
        this.Lines = lines
    }
}
