import {observable} from 'mobx'

import {PlanLevel} from './Welcome'
import {Deck} from './Deck'
import {Plan} from './Plan'

const planCollection: Plan[] = []

export class PlanModule {
    @observable private _deck: Deck<Plan>;
    @observable private _plans: Plan[];
    
	constructor(deck: Deck<Plan> = new Deck(planCollection), plans: Plan[] = []) {
        this._plans = plans;
        this._deck = deck;
        this.initPlans();
    }
    
    plansByLevel(l: PlanLevel){
        return this.plans.filter(p => p.level === l)
    }
    
    getRandomPlan(l: PlanLevel){
        return this.plansByLevel(l) && this.plansByLevel(l)[0]
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

	public get deck(): Deck<Plan> {
		return this._deck;
	}
	public set deck(value: Deck<Plan>) {
		this._deck = value;
	}
	public get plans(): Plan[] {
		return this._plans;
	}
	public set plans(value: Plan[]) {
		this._plans = value;
	}


}