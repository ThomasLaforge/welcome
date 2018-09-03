import {observable} from 'mobx'
import * as Hashids from 'hashids'
// imports

import {PlanModule} from './PlanModule'
import {SoloConstructionModule} from './SoloConstructionModule'
import { GameMode } from './Welcome';
// -------

export class SoloWelcomeModulesManager {

    @observable public constructions: SoloConstructionModule;
	@observable public plans: PlanModule;
	@observable public mode: GameMode;
	@observable public gameId: string;

	constructor(gameId?: string, gameMode = GameMode.Normal){
		if(gameId){

		}
		else {
			this.mode = gameMode
			this.init()
		}
	}

	init(gameId?:string){
		this.constructions = new SoloConstructionModule()
		this.plans = new PlanModule(this.mode)
		this.getGameId()
	}
	reset(){
		this.init()
	}

	getGameId(){
		let completeArray = [2,1]
		let hasher = new Hashids('My Other Project', 25)
		let hash = hasher.encode(completeArray)
		console.log('hash', hash, hasher.decode(hash))
		return hasher.encode(completeArray)
	}

	get remainingTurn(){
		return this.constructions.remainingTurn
	}
	
}