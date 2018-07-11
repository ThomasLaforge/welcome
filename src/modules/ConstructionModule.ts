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
    
    completePlan(p: Plan){
        p.complete()
    }

    nextTurn(){
        this.piles.forEach(p => p.next())
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