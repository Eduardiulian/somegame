import { IVector2D } from "./IVector2D.js";

export interface IPlayer {
    id: string;
    username: string;
    centroid: IVector2D;
    velocity: IVector2D;
    acceleration: IVector2D;
    radius: number;
    nsides: number;
    color: string;
    mass: number;
    angle: number;
    direction: IVector2D;
    dirAngle:number;
    coordinates: IVector2D[];
    CurNsides: number;
    square: number;
    Angels: number[];
    RayDistances: number[];

}