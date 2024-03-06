import { IVector2D } from "./IVector2D.js";

export interface IRemainder {
    id: string;
    coordinates: IVector2D[];
    CurNsides: number;
    square: number;
    color: string;
    centroid: IVector2D;
    velocity: IVector2D;
    mass:number;
 
}
