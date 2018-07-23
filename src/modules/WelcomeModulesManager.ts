import {observable} from 'mobx'
// imports
import {PlanModule} from './PlanModule'
import {ConstructionModule} from './ConstructionModule'
import { GameMode } from './Welcome';
// -------

export class WelcomeModulesManager {

    @observable public constructions: ConstructionModule;
	@observable public plans: PlanModule;
	@observable public mode: GameMode;

	constructor(gameMode = GameMode.Normal){
		this.mode = gameMode
		this.init()
	}

	init(){
		this.constructions = new ConstructionModule()
		this.plans = new PlanModule(this.mode)
	}
	reset(){
		this.init()
	}

	get turn(){
		return this.constructions.turn
	}
	get nbTurn(){
		// console.log('nb turn details', this.constructions.piles[0].constructions.length, this.constructions.piles[0].discard.length)
		return this.constructions.nbTurn
	}
    
}