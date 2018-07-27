import { observable } from "mobx";

import { Construction } from './Construction'
import ConstructionEffect from "../components/Common/ConstructionEffect";
import { EffectType } from "./Welcome";

export class House {

    @observable public leftFence: boolean;
    @observable public rightFence: boolean;
    @observable public hasPool: boolean;
    @observable public construction: Construction;
    @observable public hasRoundabout: boolean;

	constructor(
        hasPool = false,
        leftFence = false, 
        rightFence = false, 
        hasRoundabout = false,
        construction = null
    ) {
		this.leftFence = leftFence;
		this.rightFence = rightFence;
		this.hasPool = hasPool;
		this.hasRoundabout = hasRoundabout;
		this.construction = construction;
    }
    
    get built(){
        return !!this.construction
    }
    build(construction: Construction){
        this.construction = construction
    }

    buildRoundabout(){
        this.hasRoundabout = true
    }
    destroyRoundabout(){
        this.hasRoundabout = true
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

    get hasPoolBuilt(){
        return  this.construction 
                && this.construction.effect === EffectType.PoolManufacturer 
                && this.hasPool
    }

}