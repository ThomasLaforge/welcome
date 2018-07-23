import { observable } from 'mobx';
import { SoloGame } from '../SoloGame';
import { Construction } from '../Construction';
import { SoloPhaseManager } from '../SoloPhaseManager';
import { SoloPhase, GameMode } from '../Welcome'
import { House } from '../House';

export class SoloGameUIStore {
	
	@observable public game: SoloGame;
	@observable public selectedConstructionIndexes: number[];
	@observable public selectedHouse: House;
	@observable public selectedEffectTarget: number;
	@observable public phaseManager: SoloPhaseManager;
	
	constructor(game: SoloGame) {
		this.game = game;
		this.reset();
	}
	
	reset() {
		this.selectedConstructionIndexes = [];
		this.selectedHouse = null;
		this.phaseManager = new SoloPhaseManager()
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
		this.canGoNext() && this.phaseManager.next()
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

	handleHouseClick = (house: House) => {
		console.log('handleHouseClick', house)
		this.selectedHouse = house
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