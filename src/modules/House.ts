import { observable } from "mobx";

export class House {

    @observable public leftFence: boolean;
    @observable public rightFence: boolean;
    @observable public hasPool: boolean;
    @observable public poolBuilt: boolean;
    @observable public construction: number;
    @observable public hasRoundabout: boolean;

	constructor(
        hasPool = false,
        leftFence = false, 
        rightFence = false, 
        hasRoundabout = false,
        poolBuilt = false, 
        construction = null
    ) {
		this.leftFence = leftFence;
		this.rightFence = rightFence;
		this.hasPool = hasPool;
		this.hasRoundabout = hasRoundabout;
		this.poolBuilt = poolBuilt;
		this.construction = construction;
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

}