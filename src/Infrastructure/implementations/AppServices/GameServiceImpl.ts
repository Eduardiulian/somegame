import { IgameService } from "../../../AppServices/IGameService.js";
import { IPlayer } from "../../../domain/IPlayer.js";
import { ILine } from "../../../domain/ILine.js";
import { Igame } from "../../../domain/IGame.js";
import { IDirection } from "../../../domain/IDirection.js";
import { IPlayerRepository } from "./../../../domainService/IPlayer.js";
import { IRemainderRepository } from "./../../../domainService/IRemainder.js";
import { ILineRepository } from "./../../../domainService/ILine.js";
import { PlayerService } from "./../../../Infrastructure/implementations/AppServices/PlayerServiceImpl.js";
import { LineService } from "./../../../Infrastructure/implementations/AppServices/LineServiceImpl.js";
import { RemainderService } from "./../../../Infrastructure/implementations/AppServices/RemainderServiceImpl.js";
import { ICollisionService } from "../../../AppServices/ICollisionService.js";
import { ICuttingService } from "../../../AppServices/ICuttingService.js";

export class gameService implements IgameService {
    sockets: any;
    private Game: Igame
    private bots: number;
    readonly intervalId: any;
    readonly intervalGenerateId: any;
    private readonly PlayerRepository: IPlayerRepository;
    private readonly RemainderRepository: IRemainderRepository;
    private readonly LineRepository: ILineRepository
    private readonly PlayerService: PlayerService;
    private readonly LineService: LineService;
    private readonly RemainderService: RemainderService;
    private readonly CollisionService: ICollisionService
    private readonly CuttingService: ICuttingService

    constructor(
        playerRepository: IPlayerRepository,
        remainderRepository: IRemainderRepository,
        lineRepository: ILineRepository,
        playerService: PlayerService,
        lineService: LineService,
        remainderService: RemainderService,
        collisionService: ICollisionService,
        cuttingService: ICuttingService

    ) {
        this.Game = {
            lastUpdateTime: Date.now(),
            shouldSendUpdate: false
        }
        this.sockets = {};
        this.bots = 0;
        this.PlayerRepository = playerRepository;
        this.RemainderRepository = remainderRepository
        this.LineRepository = lineRepository;
        this.PlayerService = playerService;
        this.LineService = lineService;
        this.RemainderService = remainderService;
        this.CollisionService = collisionService;
        this.CuttingService = cuttingService;
        this.generateBots()
        this.intervalGenerateId = setInterval(this.generateBots.bind(this), 10000)
        this.intervalId = setInterval(this.update.bind(this, this.Game), 1000 / 60)
    }
    update(game: Igame): void {
        const now = Date.now();
        game.lastUpdateTime = now;

        const linesToRemove: ILine[] = [];
        this.LineRepository.getAllLines().forEach(line => {
            this.LineService.update(line);
            if (this.LineService.isOutOfBounds(line)) {
                linesToRemove.push(line);
            }
        });
        this.RemainderRepository.getAllRemainders().forEach(remainder => {
            this.RemainderService.update(remainder);
        });
        let lines: ILine[] = this.LineRepository.getAllLines().filter(line => !linesToRemove.includes(line));
        this.LineRepository.SetLines(lines)

        const bots = this.PlayerRepository.getAllPlayers()
            .filter(p => p.id.startsWith("bot"))
            .map(player => player.id)

        const allKeys = Object.keys(this.sockets).concat(bots);
        allKeys.forEach(playerID => {
            let player = this.PlayerRepository.getPlayerById(playerID);
            if (player != undefined) {
                let AllPlayers = this.PlayerRepository.getAllPlayers()
                let othersPlayers = Object.values(AllPlayers).filter(
                    p => p !== player
                )
                othersPlayers.forEach(other => {
                    let res = this.CollisionService.applyCollisions(player, other)
                    if (res) {
                        this.CollisionService.resolveCollision(player, other)
                    }
                });
                // collision with line
                lines.forEach(line => {
                    let points = this.CuttingService.getcollisionPoints(player, line)
                    if (points && player != undefined) {
                        let res = this.CuttingService.splitPolygon(player.coordinates, points)

                        player.coordinates = res.big
                        const index1 = res.big.findIndex((e: any) => e === res.bigPoints[0]);
                        const index2 = res.big.findIndex((e: any) => e === res.bigPoints[1]);
                        let curSides = player.CurNsides - res.big.length
                        let flag = this.PlayerService.addRaysAngles(player, curSides, index1, index2)
                        if (!flag) {
                            player.CurNsides = player.coordinates.length
                            player.centroid = this.PlayerService.calculatePolygonCentroid(player)
                            player.square = this.PlayerService.calculatePolygonArea(player)
                            player.Angels = this.PlayerService.GetAngles(player)
                            player.RayDistances = this.PlayerService.GetRayDistances(player)
                        }
                        let remainder = this.RemainderRepository.CreateRemainder(player.id, res.lit, 'hsla(360, 100%, 38%, 0.62)')
                        remainder.centroid = this.RemainderRepository.calculatePolygonCentroid(remainder)
                        this.LineRepository.removeLine(line)
                    }
                })
                this.RemainderRepository.getAllRemainders().forEach(remainder => {
                    if (player != undefined && player.id == remainder.id) {
                        let res = this.CollisionService.applyCollisions(player, remainder)
                        if (res) {
                            this.CollisionService.resolveCollision(player, remainder)
                        }
                        return;
                    }
                    let res = this.CollisionService.applyCollisions(player, remainder)
                    if (res && player != undefined) {
                        if (res.overlap > 1) {
                            this.PlayerService.CalcBeforeChangeSquare(player, remainder.square)
                            player.square = this.PlayerService.calculatePolygonArea(player)
                            player.coordinates = this.PlayerService.VerticesCoords(player);
                            this.RemainderRepository.removeRemainder(remainder)
                        }
                    }

                })
            }
        })
        Object.keys(this.sockets).forEach(playerID => {
            const socket = this.sockets[playerID];
            const player = this.PlayerRepository.getPlayerById(playerID);
            if (player != undefined && player.square <= 5000) {

                socket.emit('GAME_OVER');
                this.RemainderRepository.CreateRemainder(player.id, player.coordinates, "hsla(360, 100%, 38%, 0.62)")
                this.removePlayer(socket);
            }
        });

        bots.forEach(playerID => {
            const player = this.PlayerRepository.getPlayerById(playerID);
            if (player != undefined && player.square <= 1500) {
                this.RemainderRepository.CreateRemainder(player.id, player.coordinates, "hsla(360, 100%, 38%, 0.62)")
                this.PlayerRepository.removePlayer(playerID)
                this.bots--
            }
        });

        allKeys.forEach(playerID => {
            const player = this.PlayerRepository.getPlayerById(playerID);
            if (player != undefined) {
                this.PlayerService.update(player)
            }

        });
        if (game.shouldSendUpdate) {
            Object.keys(this.sockets).forEach(playerID => {
                const socket = this.sockets[playerID];
                const player = this.PlayerRepository.getPlayerById(playerID);
                if (player != undefined) {
                    socket.emit('GAME_UPDATE', this.createUpdate(player));
                }
            });
        } else {
            game.shouldSendUpdate = true;
        }
    }
    addPlayer(socket: any, username: string): void {
        this.sockets[socket.id] = socket;

        const x = 3000 * (0.25 + Math.random() * 0.5);
        const y = 3000 * (0.25 + Math.random() * 0.5);
        this.PlayerRepository.CreatePlayer(socket.id, username, x, y, 55, 70, 'hsla(360, 100%, 54%, 0.62)', 1)
        let player = this.PlayerRepository.getPlayerById(socket.id)
        if (player) {
            player.coordinates = this.PlayerService.VerticesCoords(player)
            player.square = this.PlayerService.calculatePolygonArea(player)
            player.Angels = this.PlayerService.GetAngles(player);
            player.RayDistances = this.PlayerService.GetRayDistances(player);
        }
    }
    removePlayer(socket: any): void {
        delete this.sockets[socket.id];
        this.PlayerRepository.removePlayer(socket.id)
    }
    createUpdate(player: IPlayer): any {
        const othersPlayers = this.PlayerRepository.getAllPlayers().filter(
            p => p !== player
        );
        let usernames = this.PlayerRepository
            .getAllPlayers()
            .sort((playerA, playerB) => playerB.square - playerA.square)
            .filter(player => !player.id.startsWith("bot"))
            .map(player => player.username)
            .slice(0, 10)
        return {
            t: Date.now(),
            me: this.PlayerService.serializeForUpdate(player),
            others: othersPlayers
                .filter(p => !p.id.startsWith("bot"))
                .map(p => this.PlayerService.serializeForUpdate(p as IPlayer)),
            lines: this.LineRepository.getAllLines().map(l => this.LineService.serializeForUpdate(l)),
            remainders: this.RemainderRepository.getAllRemainders().map(r => this.RemainderService.serializeForUpdate(r)),
            bots: othersPlayers
                .filter(p => p.id.startsWith("bot"))
                .map(p => this.PlayerService.serializeForUpdate(p as IPlayer)),
            usernames: usernames
        };
    }
    handleInput(socket: any, dir: IDirection): void {
        const player = this.PlayerRepository.getPlayerById(socket.id)
        if (player) {
            this.PlayerService.setDirection(player, dir);
        }

    }
    handleInputKey(socket: any, dir: IDirection,dirAngle:number): void {
        const player = this.PlayerRepository.getPlayerById(socket.id)
        if (player) {
            this.PlayerService.setMove(player, dir,dirAngle);
        }
    }
    handleShootKey(socket: any, dir: number): void {
        const player = this.PlayerRepository.getPlayerById(socket.id)
        if (player) {
            const angle = dir - Math.PI / 2
            const x1 = player.centroid.x + player.radius * Math.cos(angle)
            const y1 = player.centroid.y + player.radius * Math.sin(angle)
            const x2 = x1 + Math.cos(angle) * 120
            const y2 = y1 + Math.sin(angle) * 120

            this.LineRepository.CreateLine(socket.id, x1, y1, x2, y2, angle, "black", 9)// socket.id сомнительно
            //setTimeout(() => {
            //    const line = this.LineRepository.getLineById(socket.id)
            //    if (line)
            //        this.LineRepository.removeLine(line)
            //}, 2500);

        }
    }
    generateBots(): void {
        let n = 20;
        let x;
        let y;
        if (this.bots != n) {
            for (let i = 0; i < n - this.bots; i++) {
                if (n < 10) {
                    x = 3000 * (0.01 + Math.random() * 0.5);
                    y = 3000 * (0.01 + Math.random() * 0.5);
                }
                else {
                    x = 3000 * (0.1 + Math.random() * 0.7);
                    y = 3000 * (0.1 + Math.random() * 0.7);
                }
                let Nsides = Math.floor(Math.random() * 2) + 5
                let randomId = Math.random().toString(36)
                this.PlayerRepository.CreatePlayer(`bot ${randomId}`, "bot", x, y, Nsides, 30, 'hsla(360, 100%, 54%, 0.62)', 1)
                let player = this.PlayerRepository.getPlayerById(`bot ${randomId}`)
                if (player) {
                    player.coordinates = this.PlayerService.VerticesCoords(player)
                    player.square = this.PlayerService.calculatePolygonArea(player)
                    player.Angels = this.PlayerService.GetAngles(player);
                    player.RayDistances = this.PlayerService.GetRayDistances(player);
                }
            }
            this.bots += (n - this.bots);



        }


    }
    updateBots(): void {

    }
}