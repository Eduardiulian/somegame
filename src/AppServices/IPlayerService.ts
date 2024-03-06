import { IDirection } from "../domain/IDirection.js";
import { IPlayer } from "../domain/IPlayer.js";
import { IPolygonService } from "./IPolygonService.js";
export interface IPlayerService extends IPolygonService<IPlayer>{
    setMove(player: IPlayer, dir: IDirection,dirAngle:number): void 
    CalcBeforeChangeSquare(obj:IPlayer,square:number):void
}