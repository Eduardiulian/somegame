import { ILine } from "../domain/ILine.js";
export interface ILineRepository {
    CreateLine(id:string,x1:number, y1:number, x2:number, y2:number, angle:number,color:string,velocity:number):void
    getAllLines(): ILine[] 
    getLineById(id: string): ILine | undefined
    removeLine(line: ILine): void
    SetLines(lines: ILine[]):void
}