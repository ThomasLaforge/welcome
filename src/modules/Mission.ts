import {MissionType} from './Welcome'

export class Mission {

    private _type: MissionType;
    private _constructionNeeded: number[];
    

	constructor(type: MissionType, constructionNeeded: number[]) {
		this._type = type;
		this._constructionNeeded = constructionNeeded;
	}

    public get type(): MissionType {
		return this._type;
	}
    public set type(value: MissionType) {
		this._type = value;
    }
    public get constructionNeeded(): number[] {
		return this._constructionNeeded;
	}
	public set constructionNeeded(value: number[]) {
		this._constructionNeeded = value;
	}

}