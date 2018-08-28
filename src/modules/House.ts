import {FieldConstruction} from './FieldConstruction'
import { Effect } from './Effect';

export class House extends FieldConstruction {

	public effect: Effect;

    constructor(houseNumber: number, effect?: Effect){
		super(houseNumber)
		this.effect = effect
    }

	get effectType(){
		return this.effect && this.effect.type
	}

}