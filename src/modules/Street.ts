import {observable} from 'mobx'

import { Reward, PlanLevel } from './Welcome'
import {House} from './House'


export class Street {

    @observable private _houses: House[];
    @observable private _streetLine: number; //start to 0
    @observable private _parkChecked: number;

	constructor(streetLine: number, houses: House[], parkChecked = 0) {
        this.streetLine = streetLine
        this.houses = houses
        this.parkChecked = parkChecked
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
    
    parkScore(){
        return this.getParksScores()[this.parkChecked]
    }
    buildPark(){
        this.parkChecked++
    }
    removePark(){
        this.parkChecked--
    }

	public get houses(): House[] {
		return this._houses;
	}
	public set houses(value: House[]) {
		this._houses = value;
	}
	public get streetLine(): number {
		return this._streetLine;
	}
	public set streetLine(value: number) {
		this._streetLine = value;
	}
	public get parkChecked(): number {
		return this._parkChecked;
	}
	public set parkChecked(value: number) {
		this._parkChecked = value;
	}


}