import {observable} from 'mobx'

import {PlanLevel, GameMode} from './Welcome'
import {PlanDeck} from './Decks'
import {Plan} from './Plan'

export class PlanModule {
    @observable private _deck: PlanDeck;
    @observable private _plans: Plan[];
    
	constructor(gameMode = GameMode.Normal, deck: PlanDeck = new PlanDeck(gameMode), plans: Plan[] = []) {
        this._plans = plans;
        this._deck = deck;
        this.initPlans();
    }

    resetComplete(){
        this.plans.forEach(p => {
            p.isComplete = false
        })
    }
    
    plansByLevel(l: PlanLevel){
        return this.deck.arrayDeck.filter(p => p.level === l)
    }
    
    getRandomPlan(l: PlanLevel){
        return this.plansByLevel(l)[0]
    }

    initPlans(){
        this.plans = [
            this.getRandomPlan(PlanLevel.One),
            this.getRandomPlan(PlanLevel.Two),
            this.getRandomPlan(PlanLevel.Three),
        ]
    }

    // allValidate(){
    //     return this.plans.filter(p => p.complete()).length === this.plans.length
    // }

	public get deck(): PlanDeck {
		return this._deck;
	}
	public set deck(value: PlanDeck) {
		this._deck = value;
	}
	public get plans(): Plan[] {
		return this._plans;
	}
	public set plans(value: Plan[]) {
		this._plans = value;
	}


}