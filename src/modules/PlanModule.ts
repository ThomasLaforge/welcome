import {observable} from 'mobx'

import {PlanLevel, GameMode} from './Welcome'
import {PlanDeck} from './Decks'
import {Plan} from './Plan'

export class PlanModule {
    @observable public deck: PlanDeck;
    @observable public plansSelected: Plan[];
    
	constructor(gameMode = GameMode.Normal, deck: PlanDeck = new PlanDeck(gameMode), plans: Plan[] = []) {
        this.plansSelected = plans;
        this.deck = deck;
        this.initPlans();
    }

    resetComplete(){
        this.plansSelected.forEach(p => {
            p.isComplete = false
        })
    }

    completeAll(){
        this.plansSelected.forEach(p => p.complete())
    }
    
    plansByLevel(l: PlanLevel){
        return this.deck.arrayDeck.filter(p => p.level === l)
    }
    
    getRandomPlan(l: PlanLevel){
        return this.plansByLevel(l)[0]
    }

    initPlans(){
        this.plansSelected[PlanLevel.One]   = this.getRandomPlan(PlanLevel.One)
        this.plansSelected[PlanLevel.Two]   = this.getRandomPlan(PlanLevel.Two)
        this.plansSelected[PlanLevel.Three] = this.getRandomPlan(PlanLevel.Three)
    }

    getSelectedPlanByLevel(lvl: PlanLevel){
        return this.plansSelected[lvl]
    }

}