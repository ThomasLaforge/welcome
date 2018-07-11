import {observable} from 'mobx'

import { EffectType } from './Welcome'

export class Construction {

    @observable private _houseNumber: number;
    @observable private _effect: EffectType;

	constructor(houseNumber: number, effect: EffectType) {
		this._houseNumber = houseNumber;
		this._effect = effect;
	}
    
	public get houseNumber(): number {
		return this._houseNumber;
	}
	public set houseNumber(value: number) {
		this._houseNumber = value;
	}
	public get effect(): EffectType {
		return this._effect;
	}
	public set effect(value: EffectType) {
		this._effect = value;
	}

}