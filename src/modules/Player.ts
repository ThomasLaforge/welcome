import {observable} from 'mobx'
import { WelcomeMap } from './WelcomeMap';
import { Plan } from './Plan';
import { CompletedPlan } from './Welcome'

export class Player {

	public name: string;
    @observable public map: WelcomeMap;
	@observable public completedPlans: Plan[];

	constructor(map = new WelcomeMap(), name = 'Thomas') {
		this.map = map;
		this.name = name;
	}

	completePlan(p: Plan){
		this.completedPlans.push(p)
	}

	get planScore(){
		return this.completedPlans.reduce( (score, p) => score + p.getScore(), 0)
	}
}