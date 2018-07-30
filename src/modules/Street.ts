import {observable} from 'mobx'

import { EffectType } from './Welcome'
import {House} from './House'
import { Fence } from './Fence';


export class Street {

    @observable public houses: House[];
    @observable public streetLine: number; //start to 0
    @observable public fences: Fence[];
    @observable public usedHouseForPlans: House[];

	constructor(streetLine: number, houses: House[], fences: Fence[] = [], usedHouseForPlans: House[] = []) {
        this.streetLine = streetLine
        this.houses = houses
        this.usedHouseForPlans = usedHouseForPlans
        if(!fences.length){
            for (let i = 0; i < this.houses.length - 1; i++) {
                fences.push(new Fence(i))
            }
        }
        this.fences = fences
    }

    getDistricts(){
        return []
    }

    getFreeFences(){
        return this.fences.filter(f => !f.built)
    }

    getParksScores(){
        let minimumSpots = 3
        let nbSpots = this.streetLine + minimumSpots
        
        let scores = [] 
        for (let i = 0; i < nbSpots; i++) {
            scores.push(i * 2)            
        }
        // Add last spot
        let lastEltAdded = scores[scores.length - 1]
        scores.push(lastEltAdded + scores.length * 2)

        return scores
    }

    get nbParkChecked(){
        return this.houses.filter(h => h.construction && h.construction.effect === EffectType.Landscaper).length
    }
    
    get parkScore(){
        return this.getParksScores()[this.nbParkChecked]
    }

    get length(){
        return this.houses.length
    }
    
}