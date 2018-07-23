import { Reward, PlanLevel } from './Welcome'
import {observable} from 'mobx'
import { Mission } from './Mission';

export class Plan {

    @observable public reward: Reward;
    @observable public mission: Mission;
    @observable public level: PlanLevel;
    @observable public isComplete: boolean;

	constructor(reward: Reward, mission: Mission, level: PlanLevel, isComplete = false) {
		this.reward = reward;
		this.mission = mission;
		this.level = level;
		this.isComplete = isComplete;
	}

    complete(){
        this.isComplete = true
    }

    getScore(){
        return !this.isComplete ? this.reward.firstPlayer : this.reward.others
    }    

}