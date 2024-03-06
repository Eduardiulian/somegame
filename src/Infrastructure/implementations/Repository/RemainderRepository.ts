import { IRemainderRepository } from "./../../../domainService/IRemainder.js";
import { IVector2D } from "../../../domain/IVector2D.js";
import { IRemainder } from "../../../domain/IRemainder.js";

export class RemainderRepository implements IRemainderRepository {
    private Remainders: IRemainder[];
    constructor() {
        this.Remainders = [];
    }

    CreateRemainder(
        id: string,
        coordinates: IVector2D[],
        color: string
    ): IRemainder {
        const Remainder: IRemainder = {
            id: id,
            coordinates: coordinates,
            CurNsides: coordinates.length,
            square: 0,
            color: color,
            velocity: { x: 0, y: 0 },
            mass: 1,
            centroid: { x: 0, y: 0 },


        }
        this.Remainders.push(Remainder);
        return Remainder;
    }
    getAllRemainders(): IRemainder[] {
        return this.Remainders;
    }
    removeRemainder(remainder: IRemainder): void {
        this.Remainders.splice(this.Remainders.indexOf(remainder), 1)
    }
    SetRemainders(remainders: IRemainder[]): void {
        this.Remainders = remainders
    }
    calculatePolygonCentroid(remainder: IRemainder): IVector2D {
        let xSum = 0;
        let ySum = 0;

        for (let i = 0; i < remainder.CurNsides; i++) {
            const x = remainder.coordinates[i].x;
            const y = remainder.coordinates[i].y;

            xSum += x;
            ySum += y;
        }
        const centroidX = xSum / remainder.CurNsides;
        const centroidY = ySum / remainder.CurNsides;

        return { x: centroidX, y: centroidY } as IVector2D;
    }
}
