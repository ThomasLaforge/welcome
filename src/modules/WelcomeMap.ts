import {observable} from 'mobx'

import { EffectType } from './Welcome'
import { Street } from './Street'
import { House } from './House';

const DEFAULT_STREETS = require('../datas/map.json').map( (s: boolean[], i) => {
	let houses = s.map( (pool, j) => {
		let hasPool = !!pool
		return new House(hasPool, j === 0, j === (s.length - 1))
	})
	return new Street(i, houses)
})
// console.log('streets', DEFAULT_STREETS)

export class WelcomeMap {

    @observable public streets: Street[];

	constructor(streets = DEFAULT_STREETS) {
		this.streets = streets;
	}

}