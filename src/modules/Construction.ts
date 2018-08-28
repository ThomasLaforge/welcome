import {observable} from 'mobx'
import {Effect} from './Effect'

export class Construction {

    @observable public houseNumber: number;
	@observable public effect: Effect;
	public kind = 'Construction'

	constructor(houseNumber: number, effect: Effect) {
		this.houseNumber = houseNumber;
		this.effect = effect;
	}

	isEqual(h: Construction){
		return h.houseNumber === this.houseNumber && h.effectType === this.effectType
	}

	get effectType(){
		return this.effect && this.effect.type
	}

}