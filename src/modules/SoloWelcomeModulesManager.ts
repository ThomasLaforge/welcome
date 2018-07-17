import {observable} from 'mobx'
// imports
import {PlanModule} from './PlanModule'
import {SoloConstructionModule} from './SoloConstructionModule'
import { GameMode } from './Welcome';
// -------

export class SoloWelcomeModulesManager {

    @observable private _constructions: SoloConstructionModule;
	@observable private _plans: PlanModule;
	@observable private _mode: GameMode;

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

	public get constructions(): SoloConstructionModule {
		return this._constructions;
	}
	public set constructions(value: SoloConstructionModule) {
		this._constructions = value;
	}
	public get plans(): PlanModule {
		return this._plans;
	}
	public set plans(value: PlanModule) {
		this._plans = value;
	}
	public get mode(): GameMode {
		return this._mode;
	}
	public set mode(value: GameMode) {
		this._mode = value;
	}
    
}