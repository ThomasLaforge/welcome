import {observable} from 'mobx'

import { EffectType } from './Welcome'
import { Street } from './Street'
import { Field } from './Field';
import { District } from './District';
import { Construction } from './Construction';
import { Effect } from './Effect';

const DEFAULT_STREETS = require('../datas/map.json').map( (s: boolean[], i) => {
	let houses = s.map( (pool, j) => {
		let hasPool = !!pool
		return new Field(i, j, hasPool, j === 0, j === (s.length - 1))
	})
	return new Street(i, houses)
})
// console.log('streets', DEFAULT_STREETS)

export class WelcomeMap {

    @observable public streets: Street[];

	constructor(streets = DEFAULT_STREETS) {
		this.streets = streets;
		// this.initializeTestConstructions()
	}

	initializeTestConstructions(){
		let initialFences = [
			// max left
			{
				streetLine: 2,
				pos: 3
			},
			{
				streetLine: 0,
				pos: 3
			},
			{
				streetLine: 0,
				pos: 0
			},
			{
				streetLine: 1,
				pos: 9
			}
		]
		let initialConstructions = [
			// max left
			{
				houseNumber: 3,
				streetLine: 0,
				pos: 3
			},
			// max right
			{
				houseNumber: 3,
				streetLine: 0,
				pos: 3
			},
			// one space left
			{
				houseNumber: 3,
				streetLine: 0,
				pos: 3
			},
			// no space left
			{
				houseNumber: 2,
				streetLine: 1,
				pos: 0
			},
			// no space left
			{
				houseNumber: 2,
				streetLine: 0,
				pos: 0
			},
			// no space right
			{
				houseNumber: 14,
				streetLine: 0,
				pos: 9
			},
			
			// no space right
			{
				houseNumber: 14,
				streetLine: 1,
				pos: 10
			},
			// no space right
			{
				houseNumber: 10,
				streetLine: 2,
				pos: 4
			},
			{
				houseNumber: 8,
				streetLine: 2,
				pos: 3
			}
		]

		initialConstructions.forEach(c => {
			let construction = new Construction(c.houseNumber, new Effect(EffectType.TempAgency))
			this.streets[c.streetLine].fields[c.pos].build(construction)
		})

		initialFences.forEach(f => {
			this.streets[f.streetLine].fences[f.pos].build()
		})
	}

	get nbPoolBuilt(){
		return this.streets.reduce( (cpt, s) => cpt + s.fields.filter(h => h.hasPoolBuilt).length, 0)
	}

	getStreetOfHouse(h: Field){
		return this.streets.filter(s => s.fields.indexOf(h) !== -1)[0]
	}

	getDistrictsForPlans(){
		return this.streets.reduce( (districtsForPlans: District[], s) => districtsForPlans.concat(s.getDistrictsForPlans()), [] )
	}

	getDistrictsForPlansLengths(){
		return this.getDistrictsForPlans().map(d => d.length)
	}

	getDistrictsForEstate(){
		return this.streets.reduce( (districtsForEstate: District[], s) => districtsForEstate.concat(s.getDistrictsForEstate()), [] )
	}

	getDistrictsForEstateLengths(){
		return this.getDistrictsForEstate().map(d => d.length)
	}

	getNbCompleteDistricts(estateDistrictSize: number){
		return this.getDistrictsForEstateLengths().filter( size => size === estateDistrictSize).length
	}

	getAllBisHousesPossible(){
		return this.streets.reduce( (bisPossible: Field[], s) => bisPossible.concat(s.getPossiblyBisHouses()), [] )		
	}

	getAllBisFieldPossible(){
		return this.streets.reduce( (bisPossible: Field[], s) => bisPossible.concat(s.getPossiblyBisFields()), [] )			
	}

}