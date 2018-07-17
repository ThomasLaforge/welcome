import {Construction} from './Construction'
import {ConstructionPile} from './ConstructionPile'
import {Deck} from './Deck'
import {Plan} from './Plan'
import {observable} from 'mobx'
import { SoloConstructionDeck, constructions } from './Decks';
import { SpecialSoloCard } from './Welcome';

export class SoloConstructionModule {

    @observable private _piles: ConstructionPile[];
    @observable private _constructionDeck: SoloConstructionDeck;

	constructor(constructionDeck = new SoloConstructionDeck(constructions)) {
        this._constructionDeck = constructionDeck;
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

    public get piles(): ConstructionPile[] {
		return this._piles;
	}
    public set piles(value: ConstructionPile[]) {
		this._piles = value;
	}
    public get constructionDeck(): Deck<Construction|SpecialSoloCard> {
		return this._constructionDeck;
	}
    public set constructionDeck(value: Deck<Construction|SpecialSoloCard>) {
		this._constructionDeck = value;
	}

}