import {Construction} from './Construction'
import {ConstructionPile} from './ConstructionPile'
import {Deck} from './Deck'
import {Plan} from './Plan'
import {observable} from 'mobx'

export class ConstructionModule {

    @observable private _piles: ConstructionPile[];
    @observable private _constructionCards: Deck<Construction>;

	constructor(piles: ConstructionPile[], constructionCards: Deck<Construction>) {
		this._piles = piles;
		this._constructionCards = constructionCards;
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
    public get constructionCards(): Deck<Construction> {
		return this._constructionCards;
	}
    public set constructionCards(value: Deck<Construction>) {
		this._constructionCards = value;
	}

}