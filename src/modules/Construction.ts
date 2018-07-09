import {observable} from 'mobx'

import { ConstructionEffect } from './Welcome'

export class Construction {

    @observable private _houseNumber: number;
    @observable private _effect: ConstructionEffect;

	constructor(houseNumber: number, effect: ConstructionEffect) {
		this._houseNumber = houseNumber;
		this._effect = effect;
	}
    
	public get houseNumber(): number {
		return this._houseNumber;
	}
	public set houseNumber(value: number) {
		this._houseNumber = value;
	}
	public get effect(): ConstructionEffect {
		return this._effect;
	}
	public set effect(value: ConstructionEffect) {
		this._effect = value;
	}

}