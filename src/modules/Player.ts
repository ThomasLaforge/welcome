import {observable} from 'mobx'
import { WelcomeMap } from './WelcomeMap';
import { Plan } from './Plan';
import { CompletedPlan } from './Welcome'

export class Player {

	public name: string;
    @observable public map: WelcomeMap;
	@observable public completedPlans: Plan[];

	constructor(map = new WelcomeMap(), completedPlans: Plan[] = new Array(3).fill(null), name = 'Thomas') {
		this.map = map;
		this.name = name;
		this.completedPlans = completedPlans
	}

	completePlan(p: Plan){
		this.completedPlans[p.level] = p
	}

	get planScore(){
		return this.completedPlans.reduce( (score, p) => p ? score + p.getScore() : score, 0)
	}
}