import {observable} from 'mobx'

import {PlanLevel, GameMode} from './Welcome'
import {PlanDeck} from './Decks'
import {Plan} from './Plan'

export class PlanModule {
    @observable public deck: PlanDeck;
    @observable public plans: Plan[];
    
	constructor(gameMode = GameMode.Normal, deck: PlanDeck = new PlanDeck(gameMode), plans: Plan[] = []) {
        this.plans = plans;
        this.deck = deck;
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

}