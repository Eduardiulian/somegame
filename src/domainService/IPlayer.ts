import { IPlayer } from "../domain/IPlayer.js";

export interface IPlayerRepository {
    CreatePlayer(id:string,username: string,x:number,y:number,nsides:number,radius:number,color:string,mass: number): void
    getPlayerById(id: string): IPlayer| undefined
    getAllPlayers(): IPlayer[]
    removePlayer(id: string):void
}