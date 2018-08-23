import {observable} from 'mobx'

import { EffectType } from './Welcome'
import {Field} from './Field'
import { Fence } from './Fence';
import { District } from './District';
import { House } from './House';


export class Street {

    @observable public fields: Field[];
    @observable public streetLine: number; //start to 0
    @observable public fences: Fence[];
    @observable public usedHouseForPlans: Field[];

	constructor(streetLine: number, fields: Field[], fences: Fence[] = [], usedHouseForPlans: Field[] = []) {
        this.streetLine = streetLine
        this.fields = fields
        this.usedHouseForPlans = usedHouseForPlans
        if(!fences.length){
            for (let i = 0; i < this.fields.length - 1; i++) {
                fences.push(new Fence(i, streetLine))
            }
        }
        this.fences = fences
    }
    
    getDistrictsForPlans(){
        return this.districts.filter(d => d.isReasyForPlan())
    }

    getDistrictsForEstate(){
        return this.districts.filter(d => d.isComplete())
    }

    get districts(){
        let lastFenceIndex = 0
        let districts = this.builtFences.map(f => {
            let houses = this.fields.slice(lastFenceIndex, f.position + 1)
            lastFenceIndex = f.position + 1
            return new District(houses)
        })
        // Add last
        let lastDistrict = new District(this.fields.slice(lastFenceIndex))
        districts.push(lastDistrict)
        
        return districts
    }
    get completeDistricts(){
        return this.districts.filter(d => d.isComplete())
    }
    get notCompleteDistricts(){
        return this.districts.filter(d => !d.isComplete())
    }

    getPossiblyBisHouses(){
        return this.notCompleteDistricts.reduce( (houses: Field[], d) =>
            houses.concat(
                d.fields.filter( (f, i) => {
                    let leftNeighbor = i > 0 && d.fields[i - 1]
                    let rightNeighbor = i < d.fields.length - 1 && d.fields[i + 1]
                    return f.built && (!leftNeighbor.built || !rightNeighbor.built)
                })
            )
        , [])
    }
    getPossiblyBisFields(){
        let eachBisPossibilites = this.getPossiblyBisHouses().map(f => this.getNeighborsToBuild(f))
        let flattenBisPossibilites = ([] as Field[]).concat(...eachBisPossibilites)
        
		let uniqPossibilites: Field[] = []
		flattenBisPossibilites.forEach( (bisField) => {
			if(uniqPossibilites.findIndex(f => f.isEqual(bisField)) === -1){
				uniqPossibilites.push(bisField)
			}
		})

		return uniqPossibilites
    }
    getNeighborsToBuild(f: Field){
        let neighbors = []
        let houseIndex = f.position       

        if(houseIndex - 1 >= 0 && !this.fields[houseIndex - 1].built && !this.fences[houseIndex - 1].built){
            neighbors.push(this.fields[houseIndex - 1])
        }
        if(houseIndex + 1 < this.length && !this.fields[houseIndex + 1].built && !this.fences[houseIndex].built){
            neighbors.push(this.fields[houseIndex + 1])
        }
        
        return neighbors
    }

    get builtFences(){
        return this.fences.filter(f => f.built)
    }
    get freeFences(){
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
        return this.fields.filter(f => f.isHouse() && (f.construction as House).effect.type === EffectType.Landscaper).length
    }
    
    get parkScore(){
        return this.getParksScores()[this.nbParkChecked]
    }

    get length(){
        return this.fields.length
    }
    
    
}