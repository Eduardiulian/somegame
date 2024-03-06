import { IVector2D } from "../domain/IVector2D.js";
export interface IVector2DRepository {
    multiply(vector:IVector2D,multiplier: number): void
    normalize(vector:IVector2D): void
    magnitude(vector:IVector2D):number
    dotproduct(vector:IVector2D,other:IVector2D):number
    normal(vector:IVector2D): IVector2D
    copy(vector:IVector2D): IVector2D
}