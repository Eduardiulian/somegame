import { IVector2D } from "../domain/IVector2D.js";

export interface ICollisionService {
    applyCollisions(poly1: any, poly2: any): any
    resolveCollision(poly1: any, poly2: any): void
    projectOntoAxis(vertices: IVector2D[], axis: IVector2D): any
    getEdgeNormals(poly: any): IVector2D[]
    rotate(velocity:IVector2D, angle:Number):any
}