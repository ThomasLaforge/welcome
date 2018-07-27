import {observable} from 'mobx'

import { Reward, PlanLevel, EffectType } from './Welcome'
import {House} from './House'


export class Street {

    @observable public houses: House[];
    @observable public streetLine: number; //start to 0

	constructor(streetLine: number, houses: House[], parkChecked = 0) {
        this.streetLine = streetLine
        this.houses = houses
    }

    getDistricts(){
        return []
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