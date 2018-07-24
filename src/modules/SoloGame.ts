import {observable} from 'mobx'

import { SoloWelcomeModulesManager } from './SoloWelcomeModulesManager';
import {Player} from './Player'
import { Construction } from './Construction';
import {PlayOptions, GameMode} from './Welcome'
import { House } from './House';

export class SoloGame {

    @observable public player: Player;
    @observable public manager: SoloWelcomeModulesManager;
    public startDate: number;
	@observable public endDate: number;
	@observable public mode: GameMode;	

	constructor(mode = GameMode.Normal, player = new Player(), manager = new SoloWelcomeModulesManager(), startDate = Date.now(), endDate?: number) {
		this.player = player;
		this.manager = manager;
		this.startDate = startDate;
		this.endDate = endDate;
		this.mode = mode
	}
	
	reset(){
		this.player = new Player()
		this.manager = new SoloWelcomeModulesManager()
		this.startDate = Date.now()
		this.endDate = null
		this.mode = GameMode.Normal
	}
    
    play(construction: Construction, house?: House, options?: PlayOptions){
		console.log('Game:play', construction, house, options)
		house.build(construction.houseNumber)
	}

}