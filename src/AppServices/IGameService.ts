import { IDirection } from "../domain/IDirection.js";
import { IPlayer } from "../domain/IPlayer.js";

export interface IgameService {
    addPlayer(socket: any, username: string): void 
    removePlayer(socket: any): void
    createUpdate(player: IPlayer): any
    handleInput(socket: any, dir: IDirection): void 
    handleInputKey(socket: any, dir: IDirection,dirAngle:number): void
    handleShootKey(socket: any, dir: number): void 
    generateBots():void
    updateBots(): void
}
