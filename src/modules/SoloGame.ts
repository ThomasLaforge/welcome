import {observable} from 'mobx'

import { SoloWelcomeModulesManager } from './SoloWelcomeModulesManager';
import {Player} from './Player'
import { Construction } from './Construction';
import {PlayOptions, GameMode, PlanLevel} from './Welcome'
import { House } from './House';

export class SoloGame {

    @observable public player: Player;
    @observable public manager: SoloWelcomeModulesManager;
    public startDate: number;
	@observable public endDate: number;
	@observable public mode: GameMode;
	@observable public plansDone: PlanLevel[];
	@observable public nbInterimUsed: number;
	@observable public nbroundaboutUsed: number;
	@observable public nbBisBuilt: number;
	@observable public nbUnbuiltUsed: number;

	constructor(mode = GameMode.Normal, player = new Player(), manager = new SoloWelcomeModulesManager(), plansDone = [], startDate = Date.now(), endDate?: number, nbInterimUsed = 0, nbBisBuilt = 0, nbroundaboutUsed = 0, nbUnbuiltUsed = 0) {
		this.player = player;
		this.manager = manager;
		this.startDate = startDate;
		this.endDate = endDate;
		this.mode = mode
		this.plansDone = plansDone;
		this.nbInterimUsed = nbInterimUsed;
		this.nbBisBuilt = nbBisBuilt
		this.nbroundaboutUsed = nbroundaboutUsed
		this.nbUnbuiltUsed = nbUnbuiltUsed
	}
	
	reset(){
		this.player = new Player()
		this.manager = new SoloWelcomeModulesManager()
		this.startDate = Date.now()
		this.endDate = null
		this.mode = GameMode.Normal
		this.plansDone = [];
		this.nbInterimUsed = 0;
		this.nbBisBuilt = 0;
		this.nbroundaboutUsed = 0;
		this.nbUnbuiltUsed = 0;
	}
    
    play(construction: Construction, house?: House, options?: PlayOptions){
		console.log('Game:play', construction, house, options)
		house.build(construction)
	}

	completePlan(planLevel: PlanLevel){
		this.plansDone.push(planLevel)
	}

	planScore(planLevel: PlanLevel){
		return 0
	}
	get totalPlanScore(){
		return 0
	}

	parkScore(){
		return 0
	}
	get totalParkScore(){
		return 0
	}
	
	get nbPoolBuilt(){
		return this.player.nbPoolBuilt
	}
	get totalPoolScore(){
		return 0
	}
	
	get bisScore(){
		let scores = [0, 1, 3, 6, 9, 12, 16, 20, 24, 28]
		return scores[this.nbBisBuilt]
	}
	get roundaboutScore(){
		let scores = [0, 3, 8]
		return scores[this.nbBisBuilt]
	}
	
	get InterimScore(){
		return this.nbInterimUsed >= 6 ? 7 : 0
	}

	get totalScore(){
		return 0
	}


}