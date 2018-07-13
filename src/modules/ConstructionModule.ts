import {Construction} from './Construction'
import {ConstructionPile} from './ConstructionPile'
import {Deck} from './Deck'
import {Plan} from './Plan'
import {observable} from 'mobx'
import { ConstructionDeck, constructions } from './Decks';

export class ConstructionModule {

    @observable private _piles: ConstructionPile[];
    @observable private _constructionDeck: ConstructionDeck;

	constructor(nbPiles = 3, constructionDeck = new ConstructionDeck(constructions)) {
        this._constructionDeck = constructionDeck;
        console.log('constructionDeck1', constructionDeck, constructionDeck.length)
        let piles = []
        let lengthOfSlice = Math.trunc(constructionDeck.length / nbPiles)
        for (let i = 0; i < nbPiles; i++) {
            let start = i * lengthOfSlice
            let end = start + lengthOfSlice
            let constructionSplit = constructionDeck.slice(start, end)
            let p = new ConstructionPile(constructionSplit)
            piles.push(p)
        }
        this._piles = piles
    }

    get turn(){
		return this.piles[0].discard.length
	}
	get nbTurn(){
		// console.log('nb turn details', this.constructions.piles[0].constructions.length, this.constructions.piles[0].discard.length)
		return this.piles[0].constructions.length + this.piles[0].discard.length - 1
	}
    
    completePlan(p: Plan){
        p.complete()
    }

    nextTurn(){
        if(this.turn < this.nbTurn){
            this.piles.forEach(p => p.next())
        }
    }

    reshuffle(){
        this.piles.forEach(p => p.reshuffle())
    }

    public get piles(): ConstructionPile[] {
		return this._piles;
	}
    public set piles(value: ConstructionPile[]) {
		this._piles = value;
	}
    public get constructionDeck(): Deck<Construction> {
		return this._constructionDeck;
	}
    public set constructionDeck(value: Deck<Construction>) {
		this._constructionDeck = value;
	}

}