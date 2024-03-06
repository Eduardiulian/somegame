import { gameService } from '../../src/Infrastructure/implementations/AppServices/GameServiceImpl.js';
import { IPlayerRepository } from "../../src/domainService/IPlayer.js";
import { IRemainderRepository } from "../../src/domainService/IRemainder.js";
import { ILineRepository } from "../../src/domainService/ILine.js";
import { IVector2DRepository } from "../../src/domainService/IVector2D.js";

import { LineService } from "../../src/Infrastructure/implementations/AppServices/LineServiceImpl.js";
import { RemainderService } from "../../src/Infrastructure/implementations/AppServices/RemainderServiceImpl.js";
import { ICollisionService } from "../../src/AppServices/CollisionService.js";
import { ICuttingService } from "../../src/AppServices/CuttingService.js";
import { PlayerService } from '../../src/Infrastructure/implementations/AppServices/PlayerServiceImpl.js';


const vector2DRepository: IVector2DRepository = {
    multiply: jest.fn(),
    normalize: jest.fn(),
    magnitude: jest.fn(),
    dotproduct: jest.fn(),
    normal: jest.fn(),
    copy: jest.fn()

};

const playerRepository: IPlayerRepository = {
    CreatePlayer: jest.fn(),
    getPlayerById: jest.fn(),
    getAllPlayers: jest.fn(),
    removePlayer: jest.fn()

};

const remainderRepository: IRemainderRepository = {
    CreateRemainder: jest.fn(),
    getAllRemainders: jest.fn(),
    removeRemainder: jest.fn(),
    SetRemainders: jest.fn()

};

const lineRepository  = {
    Lines: [],
    CreateLine: jest.fn(),
    getAllLines: jest.fn(),
    removeLine: jest.fn(),
    SetLines: jest.fn()

};


jest.mock('../../src/Infrastructure/implementations/AppServices/PlayerServiceImpl.js')
jest.mock('./../../src/Infrastructure/implementations/AppServices/LineServiceImpl.js')
jest.mock('./../../src/Infrastructure/implementations/AppServices/RemainderServiceImpl.js')

const collisionService: ICollisionService = {
    applyCollisions: jest.fn(),
    resolveCollision: jest.fn(),
    projectOntoAxis: jest.fn(),
    getEdgeNormals: jest.fn(),
    rotate: jest.fn()
};

const cuttingService: ICuttingService = {
    splitPolygon: jest.fn(),
    isPointOnSegment: jest.fn(),
    getcollisionPoints: jest.fn(),
    getIntersection: jest.fn()
};

describe('GameService', () => {
    describe('addPlayer', () => {
        test('add Player', () => {

            // Arrange  

            const playerService = new PlayerService(vector2DRepository)
            const lineService = new LineService()
            const remainderService = new RemainderService()

            const GameService = new gameService(
                playerRepository,
                remainderRepository,
                lineRepository,
                playerService,
                lineService,
                remainderService,
                collisionService,
                cuttingService)
            const username:string ="edik"    
            const socket:any = "MIifTUAcsATkQ-SzAAAB"

            clearInterval(GameService.intervalId);
            // Act

            GameService.addPlayer(socket,username)

            //to do to remaster

            // Assert

        });

    });
}); 
