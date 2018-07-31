import {observable} from 'mobx'

import { EffectType } from './Welcome'

export class Construction {

    @observable public houseNumber: number;
	@observable public effect: EffectType;
	public kind = 'Construction';

	constructor(houseNumber: number, effect: EffectType) {
		this.houseNumber = houseNumber;
		this.effect = effect;
	}

	isEqual(c: Construction){
		return c.houseNumber === this.houseNumber && c.effect === this.effect 
	}

}