import { IPlayerService } from "../../../AppServices/IPlayerService.js";
import { IUpadateService } from "../../../AppServices/IUpdateService.js";
import { ISerializeService } from "../../../AppServices/ISerializeService.js";
import { IDirection } from "../../../domain/IDirection.js";
import { IVector2D } from "../../../domain/IVector2D.js";
import { IPlayer } from "../../../domain/IPlayer.js";
import { IVector2DRepository } from "./../../../domainService/IVector2D.js";

export class PlayerService implements IPlayerService, IUpadateService<IPlayer>, ISerializeService<IPlayer> {

    private readonly Vector2DRepository: IVector2DRepository
    constructor(
        vector2DRepository: IVector2DRepository
    ) {
        this.Vector2DRepository = vector2DRepository
    }
    update(player: IPlayer): void {
        if (player.velocity.x != 0 || player.velocity.y != 0) {
            let speed = this.Vector2DRepository.magnitude(player.velocity);
            let c = 0.01;
            let dragMagnitude;
            if (speed >= 8) {
                dragMagnitude = c * speed * speed;
            }
            else if (speed > 3 && speed < 8) {
                dragMagnitude = c + c;
            }
            else {
                dragMagnitude = c + c;
            }
            let drag = this.Vector2DRepository.copy(player.velocity);
            this.Vector2DRepository.multiply(drag, -1);
            this.Vector2DRepository.normalize(drag);
            this.Vector2DRepository.multiply(drag, dragMagnitude);
            this.applyForce(player, drag)
        }

        let isOutOfBounds = false;
        let dx = player.velocity.x
        let dy = player.velocity.y
        for (let i = 0; i < player.CurNsides; i++) {
            if (
                player.coordinates[i].x + dx < 0 ||
                player.coordinates[i].x + dx > 3000
            ) {
                isOutOfBounds = true;
                player.velocity.x = -player.velocity.x
            }
            if (player.coordinates[i].y + dy < 0 ||
                player.coordinates[i].y + dy > 3000
            ) {
                isOutOfBounds = true;
                player.velocity.y = -player.velocity.y
            }
            if (isOutOfBounds) {
                break;
            }
        }

        if (!isOutOfBounds) {
            player.centroid.x += dx
            player.centroid.y += dy

            for (let i = 0; i < player.CurNsides; i++) {
                player.coordinates[i].x += dx
                player.coordinates[i].y += dy
            }
        }
        this.trasformToIdeal(player)
        player.coordinates = this.VerticesCoords(player)
    }
    setMove(player: IPlayer, dir: IDirection, dirAngle: number): void {
        player.dirAngle = dirAngle
        this.applyForce(player, dir)

    }
    trasformToIdeal(player: IPlayer): void {
        player.angle = 2 * Math.PI / player.CurNsides;
        player.radius = this.calculateCircumcircleRadius(player, player.square)
        let amountless: number[] = [];
        let amountmore: number[] = [];
        // пофиксить погрешность
        for (let i = 0; i < player.Angels.length; i++) {
            if (player.Angels[i] > player.angle) {
                amountmore.push(i)

            }
            else if (player.Angels[i] < player.angle) {
                amountless.push(i)
            }
        }
        for (let i = 0; i < amountless.length; i++) {
            player.Angels[amountless[i]] += 0.002 / amountless.length

        }
        for (let i = 0; i < amountmore.length; i++) {
            player.Angels[amountmore[i]] -= 0.002 / amountmore.length
        }

        // пофиксить погрешность
        for (let i = 0; i < player.RayDistances.length; i++) {
            if (player.RayDistances[i] < player.radius) {
                player.RayDistances[i] += 0.06

            }
            else if (player.RayDistances[i] > player.radius) {
                player.RayDistances[i] -= 0.06
            }

        }
    }
    addRaysAngles(player: IPlayer, curSides: number, indexA: number, indexB: number): boolean {
        // 1) если curSides -1 => то исключить вершину 
        // 2) если curSides === 0 то нечего не делать
        // 3) если  curSides>0 то добавить curSides вершин
        let NewCoordinates: IVector2D[] = []
        if (indexB - indexA > 1) { // крайний случай  пример 0-31
            let tmp = indexA
            indexA = indexB
            indexB = tmp
        }
        let diffy = (player.coordinates[indexB].y - player.coordinates[indexA].y)
        let diffx = (player.coordinates[indexB].x - player.coordinates[indexA].x)

        let dx = Math.abs(diffx) / (curSides + 1)
        let dy = Math.abs(diffy) / (curSides + 1)

        if (curSides === -1) {
            // удаляем луч/угол и вершину todo
        }
        else if (curSides > 0) {
            for (let i = 1; i <= curSides; i++) {
                let xi;
                let yi;
                if (diffx > 0) {
                    xi = player.coordinates[indexA].x + dx * i
                    if (diffy < 0) {
                        yi = player.coordinates[indexA].y - dy * i
                    }
                    else { // diffy > 0
                        yi = player.coordinates[indexA].y + dy * i
                    }
                }
                else { // (diffx < 0)
                    xi = player.coordinates[indexA].x - dx * i
                    if (diffy > 0) {
                        yi = player.coordinates[indexA].y + dy * i
                    }
                    else { //diffy < 0
                        yi = player.coordinates[indexA].y - dy * i
                    }
                }
                NewCoordinates.push({ x: xi, y: yi } as IVector2D)
            } // рассмотреть ещё случай где x или y равно 0
        }


        player.coordinates.splice(indexA + 1, 0, ...NewCoordinates);

        player.CurNsides = player.coordinates.length
        player.centroid = this.calculatePolygonCentroid(player);
        player.square = this.calculatePolygonArea(player)
        player.radius = this.calculateCircumcircleRadius(player, player.square);
        player.Angels = this.GetAngles(player);
        player.RayDistances = this.GetRayDistances(player);
        return true
    }
    CalcBeforeChangeSquare(player: IPlayer, square: number): void {
        let IdealRadius: number = this.calculateCircumcircleRadius(player, player.square)
        let ModifiedRdius: number = this.calculateCircumcircleRadius(player, player.square + square)
        let k: number = (ModifiedRdius - IdealRadius) / IdealRadius
        k += 1
        for (let i = 0; i < player.RayDistances.length; i++) {
            player.RayDistances[i] *= k
        }

    }
    setDirection(player: IPlayer, dir: IDirection): void {
        player.direction = { x: dir.x, y: dir.y } as IVector2D
    }
    applyForce(player: IPlayer, force: IDirection): void {
        player.velocity.x += force.x
        player.velocity.y += force.y

    }
    VerticesCoords(player: IPlayer): IVector2D[] {
        let coords: IVector2D[] = []
        if (player.coordinates.length === 0) {
            for (let i = 0; i < player.nsides; i++) {
                coords.push(
                    {
                        x: player.centroid.x + player.radius * Math.cos(player.angle * i),
                        y: player.centroid.y + player.radius * Math.sin(player.angle * i)
                    } as IVector2D);
            }
            return coords;
        }
        else { // to do
            const angleRad = Math.atan2(player.coordinates[0].y - player.centroid.y,
                player.coordinates[0].x - player.centroid.x);
            let Anglesum = angleRad;
            coords.push({
                x: player.centroid.x + player.RayDistances[0] * Math.cos(angleRad),
                y: player.centroid.y + player.RayDistances[0] * Math.sin(angleRad)
            } as IVector2D);

            for (let i = 1; i < player.CurNsides; i++) {

                Anglesum += player.Angels[i - 1];
                let iElemetntX = player.centroid.x + player.RayDistances[i] * Math.cos(Anglesum)
                let iElemetntY = player.centroid.y + player.RayDistances[i] * Math.sin(Anglesum)
                coords.push({ x: iElemetntX, y: iElemetntY } as IVector2D)
            }
            return coords;

        }

    }
    calculatePolygonCentroid(player: IPlayer): IVector2D {
        let xSum = 0;
        let ySum = 0;

        for (let i = 0; i < player.CurNsides; i++) {
            const x = player.coordinates[i].x;
            const y = player.coordinates[i].y;

            xSum += x;
            ySum += y;
        }
        const centroidX = xSum / player.CurNsides;
        const centroidY = ySum / player.CurNsides;

        return { x: centroidX, y: centroidY } as IVector2D;
    }
    calculateCircumcircleRadius(player: IPlayer, square: number): number {
        return Math.sqrt(2 * square / (player.CurNsides * Math.sin(2 * Math.PI / player.CurNsides)));
    }
    calculatePolygonArea(player: IPlayer): number {
        let area: number = 0;

        for (let i = 0; i < player.coordinates.length; i++) {
            const x1 = player.coordinates[i].x;
            const y1 = player.coordinates[i].y;
            const x2 = player.coordinates[(i + 1) % player.coordinates.length].x;
            const y2 = player.coordinates[(i + 1) % player.coordinates.length].y;

            area += x1 * y2 - x2 * y1;
        }

        return Math.abs(area / 2);
    }
    GetAngles(player: IPlayer): number[] {

        let ABx;
        let ABy;
        let CDx;
        let CDy;
        let Angels: number[] = []
        for (let i = 1; i <= player.CurNsides; i++) {
            if (i != player.CurNsides) {

                ABx = player.coordinates[i - 1].x - player.centroid.x
                ABy = player.coordinates[i - 1].y - player.centroid.y
                CDx = player.coordinates[i].x - player.centroid.x
                CDy = player.coordinates[i].y - player.centroid.y

            }
            else {
                ABx = player.coordinates[0].x - player.centroid.x
                ABy = player.coordinates[0].y - player.centroid.y
                CDx = player.coordinates[i - 1].x - player.centroid.x
                CDy = player.coordinates[i - 1].y - player.centroid.y

            }
            let ABCD = ABx * CDx + ABy * CDy
            let DAB = Math.sqrt(ABx * ABx + ABy * ABy)
            let DCD = Math.sqrt(CDx * CDx + CDy * CDy)
            let angle = Math.acos(ABCD / (DAB * DCD))
            Angels.push(angle)
        }
        return Angels
    }
    GetRayDistances(player: IPlayer): number[] {
        let RayDistances: number[] = []
        for (let i = 0; i < player.CurNsides; i++) {
            let ABx = player.coordinates[i].x - player.centroid.x
            let ABy = player.coordinates[i].y - player.centroid.y
            let DAB = Math.sqrt(ABx * ABx + ABy * ABy);
            RayDistances.push(DAB);

        }
        return RayDistances;
    }
    //ChangeSquare(player: IPlayer,square:number) :void{ 
    //    let IdealRadius = this.calculateCircumcircleRadius(player,player.Isquare)
    //    let ModifiedRdius = this.calculateCircumcircleRadius(player,player.Isquare + square)
    //    player.Kgrow += (ModifiedRdius - IdealRadius) / (IdealRadius * 1000)
    //    player.Isquare = player.Isquare + square
//
    //}

    serializeForUpdate(player: IPlayer): any {
        return {
            coordinates: player.coordinates,
            centroid: player.centroid,
            direction: player.direction,
            color: player.color,
            radius: player.radius,
            velocity: player.velocity,
            username: player.username
        };
    }
}