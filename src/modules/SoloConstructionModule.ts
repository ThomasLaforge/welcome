import {Construction} from './Construction'
import {Deck} from './Deck'
import {Plan} from './Plan'
import {observable} from 'mobx'
import { SoloConstructionDeck, constructions } from './Decks';
import { SpecialSoloCard } from './Welcome';

const CARD_PER_TURN = 3

export class SoloConstructionModule {

    @observable private _constructionDeck: SoloConstructionDeck;
    @observable private _actualCards: Construction[];

	constructor(constructionDeck = new SoloConstructionDeck(constructions)) {
        this._constructionDeck = constructionDeck;
        this.nextTurn()
    }

    get remainingTurn(){
        return Math.floor(this.constructionDeck.length / CARD_PER_TURN)
    }
    
    completePlan(p: Plan){
        p.complete()
    }

    nextTurn(){
        console.log('next turn')
        let nextCards = this.constructionDeck.drawCards(CARD_PER_TURN)
        let isSoloSpecialCard = nextCards.filter(c => c.kind === 'SpecialSoloCard').length === 1

        if(isSoloSpecialCard){
            nextCards = nextCards.filter(c => c.kind !== 'SpecialSoloCard')
            nextCards.push(this.constructionDeck.drawOneCard())
        }

        this.actualCards = nextCards as Construction[]
    }

    public get constructionDeck(): Deck<Construction|SpecialSoloCard> {
		return this._constructionDeck;
	}
    public set constructionDeck(value: Deck<Construction|SpecialSoloCard>) {
		this._constructionDeck = value;
    }
    public get actualCards(): Construction[] {
		return this._actualCards;
	}
    public set actualCards(value: Construction[]) {
		this._actualCards = value;
	}
    
}