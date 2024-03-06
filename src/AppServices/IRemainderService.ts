import { ICalcAreaService } from "./ICalcAreaService.js";
import { IRemainder } from "../domain/IRemainder.js";
export interface IRemainderService extends ICalcAreaService<IRemainder>{
    update(Remainder: IRemainder): void 
}