import { IPlayer } from "../../src/domain/game/Player.js";
import { IVector2D } from "../../src/domain/game/Vector2D.js";

export class PlayerBuilder {
    private player: IPlayer;

    constructor() {
        this.player = {
            id: '',
            username: '',
            centroid: { x: 0, y: 0 },
            velocity: { x: 0, y: 0 },
            acceleration: { x: 0, y: 0 },
            radius: 0,
            nsides: 0,
            color: '',
            mass: 0,
            angle: 0,
            direction: { x: 0, y: 0 },
            coordinates: [],
            CurNsides: 0,
            square: 0,
            Angels: [],
            RayDistances: [],
        };
    }

    setId(id: string): PlayerBuilder {
        this.player.id = id;
        return this;
    }

    setUsername(username: string): PlayerBuilder {
        this.player.username = username;
        return this;
    }

    setCentroid(centroid: IVector2D): PlayerBuilder {
        this.player.centroid = centroid;
        return this;
    }

    setVelocity(velocity: IVector2D): PlayerBuilder {
        this.player.velocity = velocity;
        return this;
    }

    setAcceleration(acceleration: IVector2D): PlayerBuilder {
        this.player.acceleration = acceleration;
        return this;
    }

    setRadius(radius: number): PlayerBuilder {
        this.player.radius = radius;
        return this;
    }

    setNsides(nsides: number): PlayerBuilder {
        this.player.nsides = nsides;
        return this;
    }

    setColor(color: string): PlayerBuilder {
        this.player.color = color;
        return this;
    }

    setMass(mass: number): PlayerBuilder {
        this.player.mass = mass;
        return this;
    }

    setAngle(angle: number): PlayerBuilder {
        this.player.angle = angle;
        return this;
    }

    setDirection(direction: IVector2D): PlayerBuilder {
        this.player.direction = direction;
        return this;
    }

    setCoordinates(coordinates: IVector2D[]): PlayerBuilder {
        this.player.coordinates = coordinates;
        return this;
    }

    setCurNsides(CurNsides: number): PlayerBuilder {
        this.player.CurNsides = CurNsides;
        return this;
    }

    setSquare(square: number): PlayerBuilder {
        this.player.square = square;
        return this;
    }

    setAngels(Angels: number[]): PlayerBuilder {
        this.player.Angels = Angels;
        return this;
    }

    setRayDistances(RayDistances: number[]): PlayerBuilder {
        this.player.RayDistances = RayDistances;
        return this;
    }

    build(): IPlayer {
        return this.player;
    }
}