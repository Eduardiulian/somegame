import { IRemainder } from "../../src/domain/game/Remainder.js";
import { IVector2D } from "../../src/domain/game/Vector2D.js";

export class RemainderDataBuilder {
    private remainder: IRemainder;
  
    constructor() {
      this.remainder = {
        coordinates: [],
        CurNsides: 0,
        square: 0,
        color: '',
      };
    }
  
    withCoordinates(coordinates: IVector2D[]): RemainderDataBuilder {
      this.remainder.coordinates = coordinates;
      return this;
    }
  
    withCurNsides(CurNsides: number): RemainderDataBuilder {
      this.remainder.CurNsides = CurNsides;
      return this;
    }
  
    withSquare(square: number): RemainderDataBuilder {
      this.remainder.square = square;
      return this;
    }
  
    withColor(color: string): RemainderDataBuilder {
      this.remainder.color = color;
      return this;
    }
  
    build(): IRemainder {
      return this.remainder;
    }
  }