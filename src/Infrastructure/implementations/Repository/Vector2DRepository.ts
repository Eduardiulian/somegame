import { IVector2DRepository } from "./../../../domainService/IVector2D.js";
import { IVector2D } from "../../../domain/IVector2D.js";

export class Vector2DRepository implements IVector2DRepository {

    multiply(vector:IVector2D,multiplier: number): void{
        vector.x = vector.x * multiplier;
        vector.y = vector.y * multiplier;
    }
    normalize(vector:IVector2D): void{
        const magnitude = this.magnitude(vector);
        vector.x = vector.x / magnitude;
        vector.y = vector.y / magnitude;
    }

    magnitude(vector:IVector2D):number {
        return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
    }

    dotproduct(vector:IVector2D,other:IVector2D):number {
        return vector.x * other.x + vector.y * other.y;
    }



    normal(vector:IVector2D): IVector2D{
        return {x:vector.y, y:-vector.x} as IVector2D;
    }

    copy(vector:IVector2D): IVector2D{
        return {x:vector.x, y:vector.y} as IVector2D
    }
}

