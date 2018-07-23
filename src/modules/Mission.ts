import {MissionType} from './Welcome'

export class Mission {

	public type: MissionType;
	public constructionNeeded: number[];

	constructor(type: MissionType, constructionNeeded: number[]) {
		this.type = type;
		this.constructionNeeded = constructionNeeded;
	}

}