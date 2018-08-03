import { observable } from "mobx";

import { Construction } from './Construction'
import ConstructionEffect from "../components/Common/ConstructionEffect";
import { EffectType } from "./Welcome";
import { House } from "./House";
import { Bis } from "./Bis";

export class Field {

    @observable public leftFence: boolean;
    @observable public rightFence: boolean;
    @observable public hasPool: boolean;
    @observable public construction: House | Bis;
    @observable public hasRoundabout: boolean;
    @observable public usedForPlans: boolean;

	constructor(
        hasPool = false,
        leftFence = false, 
        rightFence = false, 
        hasRoundabout = false,
        construction = null,
        usedForPlans = false
    ) {
		this.leftFence = leftFence;
		this.rightFence = rightFence;
		this.hasPool = hasPool;
		this.hasRoundabout = hasRoundabout;
        this.construction = construction;
        this.usedForPlans = usedForPlans;
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

    isHouse(){
        return this.construction && this.construction instanceof House
    }
    
    isBis(){
        return this.construction && this.construction instanceof Bis
    }

    get hasPoolBuilt(){
        return  this.isHouse()
                && (this.construction as House).effectType === EffectType.PoolManufacturer 
                && this.hasPool
    }

}