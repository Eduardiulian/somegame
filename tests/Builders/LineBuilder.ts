import { ILine } from "../../src/domain/game/Line.js";
import { IVector2D } from "../../src/domain/game/Vector2D.js";

export class LineBuilder {
    private line: ILine;

    constructor() {
        this.line = {
            Spoint: { x: 0, y: 0 },
            Epoint: { x: 0, y: 0 },
            color: '',
            velocity: 0,
            angle: 0,
        };
    }

    setStartPoint(Spoint: IVector2D): LineBuilder {
        this.line.Spoint = Spoint;
        return this;
    }

    setEndPoint(Epoint: IVector2D): LineBuilder {
        this.line.Epoint = Epoint;
        return this;
    }

    setColor(color: string): LineBuilder {
        this.line.color = color;
        return this;
    }

    setVelocity(velocity: number): LineBuilder {
        this.line.velocity = velocity;
        return this;
    }

    setAngle(angle: number): LineBuilder {
        this.line.angle = angle;
        return this;
    }

    build(): ILine {
        return this.line;
    }
}