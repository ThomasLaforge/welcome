import { observable } from "mobx";

export class House {
s
    @observable private _leftFence: boolean;
    @observable private _rightFence: boolean;
    @observable private _hasPool: boolean;
    @observable private _poolBuilt: boolean;
    @observable private _construction: number;
    @observable private _hasRoundabout: boolean;

	constructor(
        hasPool = false,
        leftFence = false, 
        rightFence = false, 
        hasRoundabout = false,
        poolBuilt = false, 
        construction = null
    ) {
		this._leftFence = leftFence;
		this._rightFence = rightFence;
		this._hasPool = hasPool;
		this._hasRoundabout = hasRoundabout;
		this._poolBuilt = poolBuilt;
		this._construction = construction;
    }
    
    get built(){
        return !!this.construction
    }
    build(constructionNumber: number){
        this.construction = constructionNumber
    }

    buildRoundabout(){
        this.hasRoundabout = true
    }
    destroyRoundabout(){
        this.hasRoundabout = true
    }

    buildPool(){
        this.poolBuilt = true
    }
    removePool(){
        this.poolBuilt = false
    }
    
    // Fences methods
    createLeftFence(){
        this.leftFence = true
    }
    destroyLeftFence(){
        this.leftFence = false
    }
    createRightFence(){
        this.rightFence = true
    }
    destroyRightFence(){
        this.rightFence = false
    }

    public get leftFence(): boolean {
		return this._leftFence;
	}
    public set leftFence(value: boolean) {
		this._leftFence = value;
	}
    public get rightFence(): boolean {
		return this._rightFence;
	}
    public set rightFence(value: boolean) {
		this._rightFence = value;
	}
    public get hasPool(): boolean {
		return this._hasPool;
	}
    public set hasPool(value: boolean) {
		this._hasPool = value;
	}
    public get poolBuilt(): boolean {
		return this._poolBuilt;
	}
    public set poolBuilt(value: boolean) {
		this._poolBuilt = value;
	}
    public get construction(): number {
		return this._construction;
	}
    public set construction(value: number) {
		this._construction = value;
	}
	public get hasRoundabout(): boolean {
		return this._hasRoundabout;
	}
	public set hasRoundabout(value: boolean) {
		this._hasRoundabout = value;
	}

}