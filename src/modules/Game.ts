import {observable} from 'mobx'

import { WelcomeModulesManager } from './WelcomeModulesManager';
import {Player} from './Player'
import { Construction } from './Construction';
import {OptionsPlay, GameMode, DEFAULT_GAME_MODE} from './Welcome'
import { Field } from './Field';

export class Game {

    @observable public players: Player[];
    @observable public manager: WelcomeModulesManager;
    public startDate: number;
	@observable public endDate: number;
	public mode: GameMode

	constructor(players = [new Player()], manager = new WelcomeModulesManager(), mode = DEFAULT_GAME_MODE, startDate = Date.now(), endDate?: number) {
		this.players = players;
		this.manager = manager;
		this.mode = mode
		this.startDate = startDate;
		this.endDate = endDate;
	}
	
	reset(){
		this.players = [new Player()]
		this.manager = new WelcomeModulesManager()
		this.startDate = Date.now()
		this.endDate = null
	}
    
    play(construction: Construction, player: Player, house?: Field, options?: OptionsPlay){
		// console.log('Game:play', construction, house, options, player)
	}

}