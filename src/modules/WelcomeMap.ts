import {observable} from 'mobx'

import { EffectType } from './Welcome'
import { Street } from './Street'
import { Field } from './Field';
import { District } from './District';

const DEFAULT_STREETS = require('../datas/map.json').map( (s: boolean[], i) => {
	let houses = s.map( (pool, j) => {
		let hasPool = !!pool
		return new Field(hasPool, j === 0, j === (s.length - 1))
	})
	return new Street(i, houses)
})
// console.log('streets', DEFAULT_STREETS)

export class WelcomeMap {

    @observable public streets: Street[];

	constructor(streets = DEFAULT_STREETS) {
		this.streets = streets;
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

	getAllBisPossible(){
		return this.streets.reduce( (bisPossible: Field[], s) => bisPossible.concat(s.possiblyBisHouses), [] )		
	}
}