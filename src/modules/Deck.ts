import * as _ from 'lodash';
import {observable} from 'mobx'

export class Deck <T> {

    @observable protected _arrayDeck : T[]

    constructor(arrayDeck: T[] = [], shuffle = true) {
        this.arrayDeck = arrayDeck
        console.log('arrayDeck', this.arrayDeck, this.arrayDeck.length)
        if(shuffle){
            this.shuffle();
        }
    }

    isEmpty(){
        return this.arrayDeck.length <= 0;
    }

    get length(){
        console.log('length', this.arrayDeck, this.arrayDeck.length)
        return this.arrayDeck.length;
    }

    shuffle(){
        this.arrayDeck = _.shuffle(this.arrayDeck.slice())
    }

    addCard(card:T | T[]){
        if(Array.isArray(card)){
            this.arrayDeck = this.arrayDeck.concat(card);        
        }
        else {
            this.arrayDeck.push(card);
        }
    }

    addCardsToTheEnd(cards: T[]){ 
        cards.forEach( card => {
            this.addCard(card)
        });
    }
    
    addCardOnTop(cards: T[]){
        cards.forEach( card => {    
            this.arrayDeck.unshift(card)
        });
    }

    // Missing control if empty
    drawCards( nbCards:number ){
        let res:  T[] = [];
        for( let i=0; i < nbCards; i++ ){
            if(this.arrayDeck.length > 0){
                res.push( this.drawOneCard() );
            }
        }

        return res;
    }

    // Could be recursive ?
    drawOneCard(){
        let res:T = null;

        if ( !this.isEmpty() ) {
            res = this.arrayDeck[0];
            this.arrayDeck = this.arrayDeck.slice(1, this.arrayDeck.length);
            // this.arrayDeck.splice(0, 1);
        }
        else {
          throw new Error('No more cards in this deck');
        }

        return res;
    }

    removeCard( card:T ) {
        let pos = this.arrayDeck.indexOf( card );
        if(pos > -1){
            this.arrayDeck.splice(pos, 1);
        }
        else{
            console.log('Tentative de suppression d\'une carte qui n\'est pas présente dans la main');
        }
    }

    getCopyOfCard(index: number){
        // console.log('index', index, this.arrayDeck, this.arrayDeck.length)
        if(index < 0 || index > this.arrayDeck.length - 1){
            throw new Error('Try to get a card at index : ' + index + ' who doesn\'t exist in deck')
        }
        return this.arrayDeck[index]
    }

    slice(start: number, end: number){
        console.log('slice', start, end, this.arrayDeck.slice(start, end))
        return this.arrayDeck.slice(start, end)
    }

    public get arrayDeck(){ return this._arrayDeck }
    public set arrayDeck(newArr){ this._arrayDeck = newArr }

}