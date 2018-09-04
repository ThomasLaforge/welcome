import { observable } from 'mobx';
import { SoloGame } from '../SoloGame';
import { Construction } from '../Construction';
import { SoloPhaseManager } from '../SoloPhaseManager';
import { SoloPhase, GameMode, OptionsPlay, EffectType } from '../Welcome'
import { Field } from '../Field';
import { Fence } from '../Fence';
import { Effect } from '../Effect';

export class SoloGameUIStore {
	
	@observable public game: SoloGame;
	@observable public selectedHouse: Field;
	@observable public selectedEffectTarget: Field;
	@observable public selectedRoundabout: Field;
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
		// this.phaseManager.goTo(SoloPhase.ConstructionSelection)
	}

	canGoNext(phase = this.phaseManager.currentPhase): boolean {
		// console.log('canGoNext', phase)
		switch (phase) {
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
				console.log('play')
				if(this.actualConstructionToBuild){
					this.game.play(this.actualConstructionToBuild, this.selectedHouse, this.optionsPlay)
				}
				else {
					this.game.nbUnbuiltUsed++
				}
				this.reset()
			}

			goNext && this.phaseManager.next()

			// after next
			if( 
				// Auto skip if effect is automatically used
				this.autoSkipTest()
			){
				this.phaseManager.next()
			}
			else if(this.currentPhase === SoloPhase.ConstructionSelection && this.game.allCardsPossibleUniq.length === 0){
				console.log('no play so go at end')				
				this.phaseManager.goTo(this.game.mode === GameMode.Advanced ? SoloPhase.RoundAbout : SoloPhase.Confirmation)
			}

		}
	}

	skip(){
		// When ? => 
		if(this.currentPhase === SoloPhase.RoundAbout){
			this.selectedRoundabout = null
		}
		else if(this.currentPhase === SoloPhase.EffectChoices){
			switch (this.actualConstructionToBuild.effectType) {
				case EffectType.Bis:
					this.optionsPlay.bisField = null				
					break;
				case EffectType.RealEstateAgent:
					this.optionsPlay.estateChoice = null				
					break;
				case EffectType.Surveyor:
					this.optionsPlay.surveyorFence = null				
					break;
				default:
					break;
			}
		}

		this.next()
	}

	autoSkipTest(){
		return this.currentPhase === SoloPhase.EffectChoices && this.actualConstructionToBuild &&
			(	
				Effect.isAutoActivateEffect(this.actualConstructionToBuild.effectType)
				|| 	this.actualConstructionToBuild.effectType === EffectType.Bis && this.game.getAllBisPossible().length === 0
			)
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

		if( this.autoSkipTest() ){
			this.phaseManager.back()
		}

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
		let c = this.game.allCardsPossibleUniq[index]
		if(!this.game.cardIsDisabled(c)) {
			this.selectedCombinationIndex = index
		}
		this.next()
	}

	handleEstateChoice = (choice: number) => {
		// console.log('handle estate choice', choice)
		this.optionsPlay.estateChoice = choice
	}

	handleHouseClick = (house: Field) => {
		// console.log('handleHouseClick', house)
		switch (this.currentPhase) {
			case SoloPhase.HouseSelection:
				if(this.game.fieldCanBeSelected(house, this.actualConstructionToBuild)) {
					this.selectedHouse = house
				}
				break;
			case SoloPhase.EffectChoices:
				if(!house.built) {
					if(this.actualConstructionToBuild.effectType === EffectType.Bis && this.game.isPossibleBis(house)){
						this.optionsPlay.bisField = house
						console.log('select bis field', house)
					}
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
		// console.log('handle fence click')
		if(this.currentPhase === SoloPhase.EffectChoices && this.actualConstructionToBuild.effect.type === EffectType.Surveyor){
			this.optionsPlay.surveyorFence = f
		}
	}

	handleParkClick = () => {
		// console.log('handleParkClick')
	}

	handleStreetClick = () => {
		// console.log('handleStreetClick')
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
		return (this.selectedCombinationIndex || this.selectedCombinationIndex === 0) && this.game.allCardsPossibleUniq[this.selectedCombinationIndex]
	}

	get actualConstructionToBuild(){
		return (this.optionsPlay && this.optionsPlay.tempAgencyConstruction) || this.computedConstruction
	}

	
    get canDecrementConstruction(){
        let modified = this.optionsPlay.tempAgencyConstruction ? this.optionsPlay.tempAgencyConstruction.houseNumber : this.computedConstruction.houseNumber
        let initial = this.computedConstruction.houseNumber
        return initial - modified < 2 
    }
    get canIncrementConstruction(){
        let modified = this.optionsPlay.tempAgencyConstruction ? this.optionsPlay.tempAgencyConstruction.houseNumber : this.computedConstruction.houseNumber
        let initial = this.computedConstruction.houseNumber
        return modified - initial < 2 
    }

    handleDecrementConstruction = () => {
        if(this.canDecrementConstruction) {
			this.optionsPlay.tempAgencyConstruction = new Construction(
				this.optionsPlay.tempAgencyConstruction ? this.optionsPlay.tempAgencyConstruction.houseNumber - 1 : this.computedConstruction.houseNumber - 1, 
				this.computedConstruction.effect
			)
		}
    }
    handleIncrementConstruction = () => {
        if(this.canIncrementConstruction) {
			this.optionsPlay.tempAgencyConstruction = new Construction(
				this.optionsPlay.tempAgencyConstruction ? this.optionsPlay.tempAgencyConstruction.houseNumber + 1 : this.computedConstruction.houseNumber + 1, 
				this.computedConstruction.effect
			)		
		}
    }

	handleDebug = () => {
		console.clear()
		console.log('-----------------debug------------------')
		console.log('bis buildable')
		this.game.getAllBisPossible().forEach(f => {
			console.log('s: ' + f.streetLine + ', p: ' + f.position)
		})
		console.log('districts', this.game.map.streets.map(s => s.notCompleteDistricts))
		let problematicField = this.game.map.streets[0].fields[3]
		console.log('neighbor of problematic house', problematicField, this.game.map.streets[0].getNeighborsToBuild(problematicField))
	}
}