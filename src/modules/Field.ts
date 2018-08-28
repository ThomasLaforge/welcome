import { observable } from "mobx";

import { FieldConstruction } from './FieldConstruction'
import ConstructionEffect from "../components/Common/ConstructionEffect";
import { EffectType } from "./Welcome";
import { House } from "./House";
import { Bis } from "./Bis";

export class Field {

    public streetLine: number;
    public position: number;
    @observable public hasPool: boolean;
    @observable public construction: House | Bis;
    @observable public hasRoundabout: boolean;
    @observable public usedForPlans: boolean;

	constructor(
        streetLine: number,
        position: number,
        hasPool = false, 
        hasRoundabout = false,
        construction = null,
        usedForPlans = false
    ) {
		this.hasPool = hasPool;
		this.hasRoundabout = hasRoundabout;
        this.construction = construction;
        this.usedForPlans = usedForPlans;
        this.streetLine = streetLine;
        this.position = position;
    }
    
    get built(){
        return !!this.construction
    }
    build(construction: FieldConstruction){
        console.log('construction', construction)
        this.construction = construction
    }

    destroy(){
        this.construction = null
    }
    get used(){
        return this.usedForPlans
    }
    use(){
        this.usedForPlans = true
    }

    buildRoundabout(){
        this.hasRoundabout = true
    }
    destroyRoundabout(){
        this.hasRoundabout = true
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

    isEqual(f: Field){
        return this.streetLine === f.streetLine && this.position === f.position
    }

    get houseNumber(){
        return this.construction && this.construction.houseNumber
    }

    get effect(){
        return this.isHouse() && (this.construction as House).effect
    }
    get effectType(){
        return this.isHouse() && (this.construction as House).effectType
    }
}