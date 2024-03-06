import { IDirection } from "../domain/IDirection.js";
import { IVector2D } from "../domain/IVector2D.js";

export interface IPolygonService<P> {
    trasformToIdeal(obj: P): void
    addRaysAngles(obj: P, curSides: number, indexA: number, indexB: number): boolean
    setDirection(obj: P, dir: IDirection): void
    applyForce(obj: P, force: IDirection): void
    VerticesCoords(obj: P): IVector2D[]
    calculatePolygonCentroid(obj: P): IVector2D
    calculateCircumcircleRadius(obj: P, square: Number): Number
    GetAngles(obj: P): number[]
    GetRayDistances(obj: P): number[]
}