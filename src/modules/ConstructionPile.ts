import {observable} from 'mobx'
import * as _ from 'lodash'
import {Construction} from './Construction'

export class ConstructionPile {

    @observable private _constructions: Construction[];
    @observable private _discard: Construction[];

	constructor(constructions: Construction[], discard: Construction[]) {
		this._constructions = constructions;
		this._discard = discard;
    }

    next(){
        this.constructions = this.constructions.filter(c => _.isEqual(c, this.topCard))
        this.discard.push(this.topCard)
    }

    empty(){
        return this.constructions.length === 0
    }

    get topCard(){
        return this.constructions[0]
    }

	public get constructions(): Construction[] {
		return this._constructions;
	}
	public set constructions(value: Construction[]) {
		this._constructions = value;
	}
	public get discard(): Construction[] {
		return this._discard;
	}
	public set discard(value: Construction[]) {
		this._discard = value;
	}

}