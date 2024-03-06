import { IVector2D } from "../domain/IVector2D.js";
import { IRemainder } from "../domain/IRemainder.js";

export interface IRemainderRepository {
    CreateRemainder(id: string, coordinates: IVector2D[], color: string): IRemainder;
    getAllRemainders(): IRemainder[]
    removeRemainder(remainder: IRemainder): void
    SetRemainders(remainders: IRemainder[]): void
    calculatePolygonCentroid(remainder: IRemainder): IVector2D 
}