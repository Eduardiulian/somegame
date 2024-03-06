import { PlayerService } from '../../implementations/AppServices/PlayerServiceImpl';
import { Vector2DRepository } from '../../implementations/Repository/Vector2DRepository';


export default class PlayerServiceFactory {
    private playerService: PlayerService

    constructor() {
        this.playerService = new PlayerService(new Vector2DRepository())
    }
    build(): PlayerService {
        return this.playerService
    }

}