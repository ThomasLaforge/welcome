import {observable} from 'mobx'
// imports
import {PlanModule} from './PlanModule'
import {SoloConstructionModule} from './SoloConstructionModule'
import { GameMode } from './Welcome';
// -------

export class SoloWelcomeModulesManager {

    @observable public constructions: SoloConstructionModule;
	@observable public plans: PlanModule;
	@observable public mode: GameMode;

	constructor(gameMode = GameMode.Normal){
		this.mode = gameMode
		this.init()
	}

	init(){
		this.constructions = new SoloConstructionModule()
		this.plans = new PlanModule(this.mode)
	}
	reset(){
		this.init()
	}

	get remainingTurn(){
		return this.constructions.remainingTurn
	}
	
}