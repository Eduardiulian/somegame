import { IPlayerRepository } from "./../../../domainService/IPlayer.js";
import { IVector2D } from "../../../domain/IVector2D.js";
import { IPlayer } from "../../../domain/IPlayer.js";

export class PlayerRepository implements IPlayerRepository {
    private players: Map<string, IPlayer>;
    constructor() {
        this.players = new Map<string, IPlayer>();
    }

    CreatePlayer(id: string,
        username: string,
        x: number,
        y: number,
        nsides: number,
        radius: number,
        color: string,
        mass: number
    ): void {
        const Player: IPlayer = {
            id: id,
            username: username,
            centroid: { x: x, y: y } as IVector2D,
            velocity: { x: 0, y: 0 } as IVector2D,
            acceleration: { x: 0, y: 0 } as IVector2D,
            radius: radius,
            nsides: nsides,
            color: color,
            mass: mass,
            angle: 2 * Math.PI / nsides,
            direction: { x: x, y: y } as IVector2D,
            dirAngle: 0,
            coordinates: [],
            CurNsides: nsides,
            square: 0,
            Angels: [],
            RayDistances: [],
            //
            Isquare: 0,
            Kgrow: 1,
            //
            ProtectDelay: 5000,
            Protected: false,
            PossProtect: true,
            PossDeplay: 12000
        }
        this.players.set(id, Player);
    }
    getPlayerById(id: string): IPlayer | undefined {
        return this.players.get(id);
    }
    getAllPlayers(): IPlayer[] {
        return Array.from(this.players.values());
    }
    removePlayer(id: string): void {
        this.players.delete(id);
    }
}

