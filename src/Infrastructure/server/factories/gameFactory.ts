// IMPL game
import { LineRepository } from "../../implementations/Repository/LineRepository.js";
import { PlayerRepository } from "../../implementations/Repository/PlayerRepository.js";
import { RemainderRepository } from "../../implementations/Repository/RemainderRepository.js";
import { Vector2DRepository } from "../../implementations/Repository/Vector2DRepository.js";

import { gameService } from "../../implementations/AppServices/GameServiceImpl.js";
import { CollisionService } from "../../implementations/AppServices/CollisionServiceImpl.js";
import { CuttingService } from "../../implementations/AppServices/CuttingServiceImpl.js";
import { LineService } from "../../implementations/AppServices/LineServiceImpl.js";
import { PlayerService } from "../../implementations/AppServices/PlayerServiceImpl.js";
import { RemainderService } from "../../implementations/AppServices/RemainderServiceImpl.js";


export default class Game {
    private GameService: gameService;
    private collisionService: CollisionService;
    private cuttingService: CuttingService;
    private lineService: LineService;
    private playerService: PlayerService;
    private remainderService: RemainderService;
    private lineRepository: LineRepository;
    private playerRepository: PlayerRepository;
    private remainderRepository: RemainderRepository;
    private vector2DRepository: Vector2DRepository;

    constructor() {
        this.vector2DRepository = new Vector2DRepository();
        this.remainderService = new RemainderService(this.vector2DRepository);
        this.lineRepository = new LineRepository();
        this.playerRepository = new PlayerRepository();
        this.remainderRepository = new RemainderRepository();
        this.collisionService = new CollisionService(this.vector2DRepository);
        this.cuttingService = new CuttingService();
        this.lineService = new LineService();
        this.playerService = new PlayerService(this.vector2DRepository);
        this.GameService = new gameService(
            this.playerRepository,
            this.remainderRepository,
            this.lineRepository,
            this.playerService,
            this.lineService,
            this.remainderService,
            this.collisionService,
            this.cuttingService);
    }

    build(){
        return this.GameService
    }


}