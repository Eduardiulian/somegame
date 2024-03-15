import { IVector2D } from "../domain/IVector2D.js";

export interface ICuttingService {
    splitPolygon(poly: IVector2D[], points: any): any
    isPointOnSegment(point: any, segment: any): boolean
    getcollisionPoints(poly: any, line: any): any
    getIntersection(segment1: any, segment2: any): any
    getcollisionFlag(poly: any, line: any): boolean
}