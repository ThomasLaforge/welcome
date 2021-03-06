import {Construction} from './Construction'
import {Deck} from './Deck'
import {Plan} from './Plan'
import {observable} from 'mobx'
import { SoloConstructionDeck } from './Decks';
import { SpecialSoloCard } from './Welcome';

const CARD_PER_TURN = 3

export class SoloConstructionModule {

    @observable public constructionDeck: SoloConstructionDeck;
    @observable public actualCards: Construction[];

	constructor(shuffler?: number[], soloCardIndex?: number, constructionDeck = new SoloConstructionDeck(shuffler, soloCardIndex), actualCards = []) {
        this.constructionDeck = constructionDeck;
        this.actualCards = actualCards
        this.nextTurn()
    }

    get remainingTurn(){
        return Math.floor(this.constructionDeck.length / CARD_PER_TURN)
    }
    
    completePlan(p: Plan){
        p.complete()
    }

    // next turn return true if draw special card 
    nextTurn(): boolean {
        let nextCards = this.constructionDeck.drawCards(CARD_PER_TURN)
        let isSoloSpecialCard = nextCards.filter(c => c.kind === 'SpecialSoloCard').length === 1

        if(isSoloSpecialCard){
            nextCards = nextCards.filter(c => c.kind !== 'SpecialSoloCard')
            nextCards.push(this.constructionDeck.drawOneCard())
        }

        this.actualCards = nextCards as Construction[]
        return isSoloSpecialCard
    }

    get soloCardHasBeenDrawed(){
        return this.constructionDeck.soloCardHasBeenDrawed
    }
    
}