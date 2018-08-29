import { observable } from "mobx";

import { FieldConstruction } from './FieldConstruction'
import { EffectType } from "./Welcome";
import { House } from "./House";
import { Bis } from "./Bis";
import { RoundAbout } from "./RoundAbout";

export class Field {

    public streetLine: number;
    public position: number;
    @observable public hasPool: boolean;
    @observable public construction: House | Bis | RoundAbout;
    @observable public usedForPlans: boolean;

	constructor(
        streetLine: number,
        position: number,
        hasPool = false, 
        construction = null,
        usedForPlans = false
    ) {
		this.hasPool = hasPool;
        this.construction = construction;
        this.usedForPlans = usedForPlans;
        this.streetLine = streetLine;
        this.position = position;
    }
    
    get built(){
        return !!this.construction
    }
    build(construction: FieldConstruction){
        // console.log('construction', construction)
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

    isHouse(){
        return this.construction && this.construction instanceof House
    }
    
    isBis(){
        return this.construction && this.construction instanceof Bis
    }

    isRoundabout(){
        return this.construction && this.construction instanceof RoundAbout
    }

    isFree(){
        return !this.isHouse() && !this.isRoundabout() && !this.isBis()
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