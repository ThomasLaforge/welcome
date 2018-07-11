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

	get turn(){
		return this.constructions.piles[0].discard.length
	}
	get nbTurn(){
		// console.log('nb turn details', this.constructions.piles[0].constructions.length, this.constructions.piles[0].discard.length)
		return this.constructions.piles[0].constructions.length + this.constructions.piles[0].discard.length
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