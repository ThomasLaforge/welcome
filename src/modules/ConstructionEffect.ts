import {observable} from 'mobx'

import { EffectType } from './Welcome'

export class ConstructionEffect {

    @observable public type: EffectType;

	constructor(type: EffectType) {
		this.type = type;
    }
    
    get imageName(){
        let imgName: string;
        switch (this.type) {
            case EffectType.Surveyor:
                imgName = 'surveyor'                
                break;
            case EffectType.PoolManufacturer:
                imgName = 'pool'                
                break;
            case EffectType.TempAgency:
                imgName = 'interim'                
                break;
            case EffectType.Bis:
                imgName = 'bis'
                break;
            case EffectType.Landscaper:
                imgName = 'park'
                break;
            case EffectType.RealEstateAgent:
                imgName = 'real_estate_agent'
                break;
            
        }
        return imgName + '.png'
    }

    get cssClassName(){
        switch (this.type) {
            case EffectType.Surveyor:
                return 'surveyor'
            case EffectType.PoolManufacturer:
                return 'pool'
            case EffectType.TempAgency:
                return 'interim'
            case EffectType.Bis:
                return 'bis'
            case EffectType.Landscaper:
                return 'park'
            case EffectType.RealEstateAgent:
                return 'real_estate_agent'
        }
    }

}