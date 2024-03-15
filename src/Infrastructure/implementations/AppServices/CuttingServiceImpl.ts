import { IVector2D } from "../../../domain/IVector2D.js";
import { ICuttingService } from "../../../AppServices/ICuttingService.js";

export class CuttingService implements ICuttingService {
    splitPolygon(poly: IVector2D[], points: any): any {
        let Bigpoly: IVector2D[] = [];
        let BigTwoPoints: IVector2D[] = []; //
        let litpoly: IVector2D[] = [];
        let ligTwoPoints: IVector2D[] = []; ///
        let flag = false;
        for (let i = 0; i < poly.length; i++) {
            let nextIndex = (i + 1) % poly.length
            if (!flag) {
                Bigpoly.push(poly[i])
            }
            else {
                litpoly.push(poly[i])
            }
            for (let j = 0; j < points.length; j++) {

                if (this.isPointOnSegment(points[j],
                    {
                        start:
                            { x: poly[i].x, y: poly[i].y },
                        end:
                            { x: poly[nextIndex].x, y: poly[nextIndex].y }
                    })) {

                    let BigPointVec = { x: points[j].x, y: points[j].y } as IVector2D
                    let ligPointVec = { x: points[j].x, y: points[j].y } as IVector2D
                    BigTwoPoints.push(BigPointVec)
                    ligTwoPoints.push(ligPointVec)
                    Bigpoly.push(BigPointVec)
                    litpoly.push(ligPointVec)
                    flag = true;
                    if (points.length === 1) {
                        flag = false;
                    }
                    points.splice(j, 1);
                }

            }
        }
        if (Bigpoly.length >= litpoly.length) {
            return { big: Bigpoly, lit: litpoly, bigPoints: BigTwoPoints }
        }
        else if (Bigpoly.length < litpoly.length) {
            return { big: litpoly, lit: Bigpoly, bigPoints: ligTwoPoints }
        }
    }
    isPointOnSegment(point: any, segment: any): boolean {
        var minX = Math.min(segment.start.x, segment.end.x);
        var maxX = Math.max(segment.start.x, segment.end.x);
        var minY = Math.min(segment.start.y, segment.end.y);
        var maxY = Math.max(segment.start.y, segment.end.y);

        if (point.x >= minX && point.x <= maxX && point.y >= minY && point.y <= maxY) {
            return true;
        } else {
            return false;
        }
    }
    getcollisionPoints(poly: any, line: any): any {
        let Vertices = poly.coordinates;
        let Points: any = [];
        for (let i = 0; i < Vertices.length; i++) {
            let nextIndex = (i + 1) % Vertices.length
            let res = this.getIntersection({
                x1: Vertices[i].x,
                y1: Vertices[i].y,
                x2: Vertices[nextIndex].x,
                y2: Vertices[nextIndex].y
            },
                {
                    x1: line.Spoint.x,
                    y1: line.Spoint.y,
                    x2: line.Epoint.x,
                    y2: line.Epoint.y
                })
            if (res) {
                Points.push(res)
            }

        }
        if (Points.length === 2) {
            return Points
        }
        else {
            return false
        }
    }
    getIntersection(segment1: any, segment2: any): any {
        let x1 = segment1.x1, y1 = segment1.y1, x2 = segment1.x2, y2 = segment1.y2;
        let x3 = segment2.x1, y3 = segment2.y1, x4 = segment2.x2, y4 = segment2.y2;

        let denominator = ((y4 - y3) * (x2 - x1)) - ((x4 - x3) * (y2 - y1));

        if (denominator === 0) {
            return null;
        }

        let ua = (((x4 - x3) * (y1 - y3)) - ((y4 - y3) * (x1 - x3))) / denominator;
        let ub = (((x2 - x1) * (y1 - y3)) - ((y2 - y1) * (x1 - x3))) / denominator;

        if (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1) {

            let intersectionX = x1 + (ua * (x2 - x1));
            let intersectionY = y1 + (ua * (y2 - y1));
            return { x: intersectionX, y: intersectionY };
        }

        return null;
    }
    getcollisionFlag(poly:any, line:any):boolean {
        let Vertices = poly.coordinates;
        for (let i = 0; i < Vertices.length; i++) {
            let nextIndex = (i + 1) % Vertices.length
            let res = this.getIntersection({
                x1: Vertices[i].x,
                y1: Vertices[i].y,
                x2: Vertices[nextIndex].x,
                y2: Vertices[nextIndex].y
            },
                {
                    x1: line.Spoint.x,
                    y1: line.Spoint.y,
                    x2: line.Epoint.x,
                    y2: line.Epoint.y
                })
            if (res) {
                return true
            }
    
        }
        return false
    }
}