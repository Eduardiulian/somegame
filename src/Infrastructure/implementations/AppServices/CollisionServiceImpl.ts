import { IVector2D } from "../../../domain/IVector2D.js";
import { ICollisionService } from "../../../AppServices/ICollisionService.js";
import { IVector2DRepository } from "./../../../domainService/IVector2D.js";

export class CollisionService implements ICollisionService {
    private readonly Vector2DRepository: IVector2DRepository
    constructor(
        vector2DRepository: IVector2DRepository
    ) {
        this.Vector2DRepository = vector2DRepository
    }
    applyCollisions(poly1: any, poly2: any): any {
        const axes1 = this.getEdgeNormals(poly1);
        const axes2 = this.getEdgeNormals(poly2);
        const axes = axes1.concat(axes2);
        let overlap = 999999999;
        let min_penetration_axis: any = null;

        for (let i = 0; i < axes.length; i++) {
            const projection1 = this.projectOntoAxis(poly1.coordinates, axes[i])
            const projection2 = this.projectOntoAxis(poly2.coordinates, axes[i])
            if (projection1.min > projection2.max || projection2.min > projection1.max) {

                return null
            }
            let o = Math.min(projection1.max, projection2.max) - Math.max(projection1.min, projection2.min)
            if (o < overlap) {
                overlap = o;
                min_penetration_axis = axes[i]
            }
        }
        return { min: min_penetration_axis, overlap: overlap }

    }
    resolveCollision(poly1: any, poly2: any): void {
        const xVelocityDiff = poly1.velocity.x - poly2.velocity.x;
        const yVelocityDiff = poly1.velocity.y - poly2.velocity.y;

        const xDist = poly2.centroid.x - poly1.centroid.x;
        const yDist = poly2.centroid.y - poly1.centroid.y;

        if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
            const angle = -Math.atan2(poly2.centroid.y - poly1.centroid.y, poly2.centroid.x - poly1.centroid.x);

            const m1 = poly1.mass;
            const m2 = poly2.mass;

            const u1 = this.rotate(poly1.velocity, angle);
            const u2 = this.rotate(poly2.velocity, angle);

            const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
            const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

            const vFinal1 = this.rotate(v1, -angle);
            const vFinal2 = this.rotate(v2, -angle);

            poly1.velocity.x = vFinal1.x;
            poly1.velocity.y = vFinal1.y;

            poly2.velocity.x = vFinal2.x;
            poly2.velocity.y = vFinal2.y;
        }

    }
    projectOntoAxis(vertices: IVector2D[], axis: IVector2D): any {
        let min = this.Vector2DRepository.dotproduct(axis, vertices[0])
        let max = min;
        for (let i = 1; i < vertices.length; i++) {
            let proj = this.Vector2DRepository.dotproduct(axis, vertices[i])
            if (proj < min) {
                min = proj
            }
            else if (proj > max) {
                max = proj
            }
        }
        return { min: min, max: max }

    }
    getEdgeNormals(poly: any): IVector2D[] {
        let edgeNormals: IVector2D[] = [];
        for (let i = 1; i < poly.CurNsides; i++) {
            let p1x = poly.coordinates[i - 1].x;
            let p1y = poly.coordinates[i - 1].y;
            let p2x = poly.coordinates[i].x
            let p2y = poly.coordinates[i].y;
            let edge = { x: p2x - p1x, y: p2y - p1y } as IVector2D; // получаем разность векторов

            let normal = this.Vector2DRepository.normal(edge)
            this.Vector2DRepository.normalize(normal)
            edgeNormals.push(normal);
        }

        return edgeNormals;

    }
    rotate(velocity: IVector2D, angle: number): any {
        const rotatedVelocities = {
            x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
            y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
        };

        return rotatedVelocities;

    }
}