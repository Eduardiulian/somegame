import { ISerializeService } from "../../../AppServices/ISerializeService.js";
import { ILine } from "../../../domain/ILine.js";
import { IUpadateService } from "../../../AppServices/IUpdateService.js";
import { ILineService } from "../../../AppServices/ILineService.js";

export class LineService implements ISerializeService<ILine>,IUpadateService<ILine>,ILineService {
    update(Line:ILine):void{
        const vx = Math.cos(Line.angle) * Line.velocity;
        const vy = Math.sin(Line.angle) * Line.velocity;

        Line.Spoint.x += vx;
        Line.Spoint.y += vy;
        Line.Epoint.x += vx;
        Line.Epoint.y += vy;
        
    }
    serializeForUpdate(Line: ILine): any {
        return {
            x1: Line.Spoint.x,
            y1: Line.Spoint.y,
            x2: Line.Epoint.x,
            y2: Line.Epoint.y,
            color: Line.color,
            angle: Line.angle
        }
    }
    isOutOfBounds(Line:ILine):boolean{
        return Line.Epoint.x < 0 || Line.Epoint.x > 3000 || Line.Epoint.y < 0 || Line.Epoint.y > 3000;
    }
}