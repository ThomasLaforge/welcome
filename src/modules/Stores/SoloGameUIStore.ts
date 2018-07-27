import { observable } from 'mobx';
import { SoloGame } from '../SoloGame';
import { Construction } from '../Construction';
import { SoloPhaseManager } from '../SoloPhaseManager';
import { SoloPhase, GameMode, PlayOptions } from '../Welcome'
import { House } from '../House';

export class SoloGameUIStore {
	
	@observable public game: SoloGame;
	@observable public selectedConstructionIndexes: number[];
	@observable public selectedHouse: House;
	@observable public selectedEffectTarget: House;
	@observable public phaseManager: SoloPhaseManager;
	@observable public optionsPlay: PlayOptions;
	@observable public selectedRoundabout: House;
	
	constructor(game: SoloGame) {
		this.game = game;
		this.reset();
	}
	
	reset() {
		this.selectedConstructionIndexes = [];
		this.selectedHouse = null;
		this.selectedRoundabout = null;
		this.selectedEffectTarget = null;
		this.optionsPlay = {};
		this.phaseManager = new SoloPhaseManager();
	}

	canGoNext(): boolean {
		console.log('canGoNext', this.phaseManager.currentPhase)
		switch (this.phaseManager.currentPhase) {
			case SoloPhase.ConstructionSelection:
				console.log('on', this.selectedConstructionIndexes.length , this.selectedConstructionIndexes.length === 2)
				return this.selectedConstructionIndexes.length === 2
			case SoloPhase.HouseSelection:
				return !!this.selectedHouse
			case SoloPhase.EffectChoices:
			case SoloPhase.Confirmation:
				return true
			default:
				return false
		}
	}

	next(){
		if(this.canGoNext()){
			if(this.currentPhase === SoloPhase.Confirmation){
				this.game.play(this.computedConstruction, this.selectedHouse, this.optionsPlay)
				this.selectedHouse = null
				this.selectedConstructionIndexes = []
				this.game.manager.constructions.nextTurn()
			}

			this.phaseManager.next()

			// Before implementing effects
			// if(this.currentPhase === SoloPhase.EffectChoices){
			// 	this.next()
			// }
		}
	}

	back(){
		// switch (this.phaseManager.currentPhase) {
		// 	case SoloPhase.ConstructionSelection:
		// 		console.log('on', this.selectConstruction.length === 2)
		// 		return this.selectConstruction.length === 2
		// 	default:
		// 		return false
		// }
		this.phaseManager.back()
	}

	get activePlayerActionStep(){
		let currentPhase = this.phaseManager.currentPhase
		if(this.game.mode === GameMode.Normal && currentPhase > SoloPhase.RoundAbout){
			currentPhase--
		}
		return this.phaseManager.currentPhase
	}

	switchConstruction(construction: Construction){
		let indexOfConstruction = this.game.manager.constructions.actualCards.indexOf(construction)
        let indexOfSelectedConstruction = this.selectedConstructionIndexes.indexOf(indexOfConstruction)
        if(indexOfSelectedConstruction === -1){
			this.selectConstruction(construction)
		}
		else {
			this.unselectConstruction(construction)
		}
	}

	selectConstruction(construction: Construction){
		if(this.selectedConstructionIndexes.length < 2){
			let index = this.game.manager.constructions.actualCards.indexOf(construction)
			this.selectedConstructionIndexes.push(index)
		}
		else {
			console.warn('too many selected construction')
		}
	}

	unselectConstruction(construction: Construction){
		let indexConstruction = this.game.manager.constructions.actualCards.indexOf(construction)
		this.selectedConstructionIndexes = this.selectedConstructionIndexes.filter( index => index !== indexConstruction)
	}

	switchSelectedConstructions(){
		this.selectedConstructionIndexes = [this.selectedConstructionIndexes[1], this.selectedConstructionIndexes[0]]
	}
	
	isInPhase(soloPhase: SoloPhase){
		return this.phaseManager.currentPhase === soloPhase
	}

	handleEstateChoice(choice: number){
		console.log('handle estate choice', choice)
		this.optionsPlay.estateChoice = choice
	}

	handleHouseClick = (house: House) => {
		console.log('handleHouseClick', house)
		switch (this.currentPhase) {
			case SoloPhase.HouseSelection:
				if(this.game.houseCanBeSelected(house, this.computedConstruction)) {
					this.selectedHouse = house
				}
				break;
			case SoloPhase.EffectChoices:
				if(!house.built) {
					this.selectedEffectTarget = house
				}
				break;
			case SoloPhase.RoundAbout:
				if(!house.built) {
					this.selectedRoundabout = house
				}
				break;
			default:
				break;
		}
	}

	handleParkClick = () => {
		// console.log('handleParkClick')
	}

	handleStreetClick = () => {
		// console.log('handleStreetClick')
	}

	get computedConstruction(){
		return new Construction(this.selectedConstructions[0].houseNumber, this.selectedConstructions[1].effect)
	}

	get selectedConstructions(){
		return this.selectedConstructionIndexes.map(i => 
			this.game.manager.constructions.actualCards[i]
		)
	}

	get currentPhase(){
		return this.phaseManager.currentPhase
	}

}