import { ISerializeService } from "../../../AppServices/ISerializeService.js";
import { ICalcAreaService } from "../../../AppServices/ICalcAreaService.js";
import { IRemainderService } from "../../../AppServices/IRemainderService.js";
import { IRemainder } from "../../../domain/IRemainder.js";
import { IVector2DRepository } from "./../../../domainService/IVector2D.js";
import { IDirection } from "../../../domain/IDirection.js";


export class RemainderService implements IRemainderService, ISerializeService<IRemainder>, ICalcAreaService<IRemainder> {
    private readonly Vector2DRepository: IVector2DRepository
    constructor(
        vector2DRepository: IVector2DRepository
    ) {
        this.Vector2DRepository = vector2DRepository
    }

    update(remainder: IRemainder): void {
        if (remainder.velocity.x != 0 || remainder.velocity.y != 0) {
            let speed = this.Vector2DRepository.magnitude(remainder.velocity);
            let c = 0.01;
            let dragMagnitude = 0;
            if (speed >= 7) {
                dragMagnitude = c * speed * speed;
            }
            else if (speed > 3 && speed < 7) {
                dragMagnitude = c + c + c;
            }
            else {
                dragMagnitude = c + c + c;
            }
            let drag = this.Vector2DRepository.copy(remainder.velocity);
            this.Vector2DRepository.multiply(drag, -1);
            this.Vector2DRepository.normalize(drag);
            this.Vector2DRepository.multiply(drag, dragMagnitude);
            this.applyForce(remainder, drag)
        }

        let isOutOfBounds = false;
        let dx = remainder.velocity.x
        let dy = remainder.velocity.y
        for (let i = 0; i < remainder.CurNsides; i++) {
            if (
                remainder.coordinates[i].x + dx < 0 ||
                remainder.coordinates[i].x + dx > 3000
            ) {
                isOutOfBounds = true;
                remainder.velocity.x = -remainder.velocity.x
            }
            if (remainder.coordinates[i].y + dy < 0 ||
                remainder.coordinates[i].y + dy > 3000
            ) {
                isOutOfBounds = true;
                remainder.velocity.y = -remainder.velocity.y
            }
            if (isOutOfBounds) {
                break;
            }
        }

        if (!isOutOfBounds) {
            remainder.centroid.x += dx
            remainder.centroid.y += dy

            for (let i = 0; i < remainder.CurNsides; i++) {
                remainder.coordinates[i].x += dx
                remainder.coordinates[i].y += dy
            }
        }
    }
    applyForce(remainder: IRemainder, force: IDirection): void {
        remainder.velocity.x += force.x
        remainder.velocity.y += force.y
    }

    calculatePolygonArea(remainder: IRemainder): Number {
        let area = 0;

        for (let i = 0; i < remainder.coordinates.length; i++) {
            const x1 = remainder.coordinates[i].x;
            const y1 = remainder.coordinates[i].y;
            const x2 = remainder.coordinates[(i + 1) % remainder.coordinates.length].x;
            const y2 = remainder.coordinates[(i + 1) % remainder.coordinates.length].y;

            area += x1 * y2 - x2 * y1;
        }
        return Math.abs(area / 2);
    }
    serializeForUpdate(Remainder: IRemainder): any {
        return {
            coordinates: Remainder.coordinates,
            color: Remainder.color
        }
    }
}