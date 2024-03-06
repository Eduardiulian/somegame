import { ILine } from "../domain/ILine.js";
export interface ILineService {

    isOutOfBounds(Line: ILine): boolean
}