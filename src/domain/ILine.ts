import { IVector2D } from "./IVector2D.js";

export interface ILine {
    id?:string;
    Spoint: IVector2D;
    Epoint: IVector2D;
    color: string;
    velocity: number;
    angle: number;

}