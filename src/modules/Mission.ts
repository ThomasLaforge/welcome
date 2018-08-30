import {PlanMissionType} from './Welcome'

export class Mission {

	public type: PlanMissionType;
	public constructionNeeded: number[];

	constructor(type: PlanMissionType, constructionNeeded?: number[]) {
		this.type = type;
		this.constructionNeeded = constructionNeeded;
	}

}