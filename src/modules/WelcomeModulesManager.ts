import {observable} from 'mobx'
// imports
import {PlanModule} from './PlanModule'
import {ConstructionModule} from './ConstructionModule'
// -------

export class WelcomeModulesManager {

    @observable private _constructions: ConstructionModule;
    @observable private _plans: PlanModule;

	constructor(){
        this.init()
	}

	init(){
		this.constructions = new ConstructionModule()
		this.plans = new PlanModule()
	}
	reset(){
		this.init()
	}

	public get constructions(): ConstructionModule {
		return this._constructions;
	}
	public set constructions(value: ConstructionModule) {
		this._constructions = value;
	}
	public get plans(): PlanModule {
		return this._plans;
	}
	public set plans(value: PlanModule) {
		this._plans = value;
	}

    
}