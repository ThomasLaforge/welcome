import {observable} from 'mobx'
import * as _ from 'lodash'
import {Construction} from './Construction'

export class ConstructionPile {

    @observable private _constructions: Construction[];
    @observable private _discard: Construction[];

	constructor(constructions: Construction[], discard: Construction[] = []) {
		this._constructions = constructions;
		this._discard = discard;
		this.next()
    }

    next(){
		this.discard.push(this.topCard)
		this.constructions = this.constructions.slice(1, this.constructions.length)
    }

    empty(){
        return this.constructions.length === 0
	}
	
	reshuffle(){
		this.constructions = this.constructions.concat(this.discard)
		this.constructions = _.shuffle(this.constructions.slice())
		this.discard = []
		this.next()
	}

    get topCard(){
        return this.constructions[0]
	}
	
	get lastCard(){
		return this.discard[this.discard.length - 1]
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