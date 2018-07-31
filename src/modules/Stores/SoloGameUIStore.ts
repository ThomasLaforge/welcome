import { observable } from 'mobx';
import { SoloGame } from '../SoloGame';
import { Construction } from '../Construction';
import { SoloPhaseManager } from '../SoloPhaseManager';
import { SoloPhase, GameMode, OptionsPlay, EffectType } from '../Welcome'
import { House } from '../House';
import { Fence } from '../Fence';
import { Effect } from '../Effect';

export class SoloGameUIStore {
	
	@observable public game: SoloGame;
	@observable public selectedHouse: House;
	@observable public selectedEffectTarget: House;
	@observable public selectedRoundabout: House;
	@observable public phaseManager: SoloPhaseManager;
	@observable public optionsPlay: OptionsPlay;
	@observable public selectedCombinationIndex: number;
	
	constructor(game: SoloGame, phaseManager = new SoloPhaseManager()) {
		this.game = game;
		this.phaseManager = phaseManager
		this.reset();
	}
	
	reset() {
		this.selectedCombinationIndex = null;
		this.selectedHouse = null;
		this.selectedRoundabout = null;
		this.selectedEffectTarget = null;
		this.optionsPlay = {};
		this.phaseManager.goTo(SoloPhase.ConstructionSelection)
		this.game.manager.constructions.nextTurn()
	}

	canGoNext(): boolean {
		// console.log('canGoNext', this.phaseManager.currentPhase)
		switch (this.phaseManager.currentPhase) {
			case SoloPhase.ConstructionSelection:
				return !!this.computedConstruction
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
		let goNext = this.canGoNext()
		if(goNext){
			// before next
			if(this.currentPhase === SoloPhase.Confirmation){
				this.game.play(this.computedConstruction, this.selectedHouse, this.optionsPlay)
				this.reset()
				goNext = false
			}
			if(this.currentPhase === SoloPhase.ConstructionSelection && (!this.computedConstruction || !this.game.constructionCanBeConstructed(this.computedConstruction))){
				goNext = false
				this.phaseManager.goTo(this.game.mode === GameMode.Advanced ? SoloPhase.RoundAbout : SoloPhase.Confirmation)
			}

			goNext && this.phaseManager.next()

			// after next
			if(
				// Auto skip if effect is automatically used
				this.currentPhase === SoloPhase.EffectChoices && (this.computedConstruction && Effect.isAutoActivateEffect(this.computedConstruction.effect))
			){
				this.phaseManager.next()
			}

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

	isInPhase(soloPhase: SoloPhase){
		return this.phaseManager.currentPhase === soloPhase
	}

	handleClickOnPossibleCard = (index) => {
		let c = this.game.allCardsCombinations[index]
		if(!this.game.cardIsDisabled(c)) {
			this.selectedCombinationIndex = index
		}
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

	handleFenceClick = (f: Fence) => {
		console.log('handle fence click')
		this.optionsPlay.surveyorFence = f
	}

	handleParkClick = () => {
		console.log('handleParkClick')
	}

	handleStreetClick = () => {
		console.log('handleStreetClick')
	}

	get currentPhase(){
		return this.phaseManager.currentPhase
	}

	get constructionSkipped(){
		return this.currentPhase > SoloPhase.HouseSelection && this.selectedHouse === null
	}

	get effectSkipped(){
		// Not true. to work
		return this.currentPhase > SoloPhase.EffectChoices && this.optionsPlay === {}
	}

	get computedConstruction(){
		return this.selectedCombinationIndex && this.game.allCardsCombinations[this.selectedCombinationIndex]
	}

}