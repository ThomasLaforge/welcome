import { Reward, PlanLevel } from './Welcome'
import {observable} from 'mobx'

export class Plan {

    @observable private _reward: Reward;
    @observable private _mission: number[];
    @observable private _level: PlanLevel;
    @observable private _isComplete: boolean;

	constructor(reward: Reward, mission: number[], level: PlanLevel, isComplete = false) {
		this._reward = reward;
		this._mission = mission;
		this._level = level;
		this._isComplete = isComplete;
	}

    complete(){
        this.isComplete = true
    }

    getScore(){
        return !this.isComplete ? this.reward.firstPlayer : this.reward.others
    }

    public get reward(): Reward {
		return this._reward;
	}
	public set reward(value: Reward) {
		this._reward = value;
	}
    public get mission(): number[] {
		return this._mission;
    }
    public set mission(value: number[]) {
		this._mission = value;
	}
    public get isComplete(): boolean {
		return this._isComplete;
	}
	public set isComplete(value: boolean) {
		this._isComplete = value;
    }
    public get level(): PlanLevel {
		return this._level;
	}
    public set level(value: PlanLevel) {
		this._level = value;
	}
    

}