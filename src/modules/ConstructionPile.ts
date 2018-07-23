import {observable} from 'mobx'
import * as _ from 'lodash'
import {Construction} from './Construction'

export class ConstructionPile {

    @observable public constructions: Construction[];
    @observable public discard: Construction[];

	constructor(constructions: Construction[], discard: Construction[] = []) {
		this.constructions = constructions;
		this.discard = discard;
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

}