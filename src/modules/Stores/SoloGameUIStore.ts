import { observable } from 'mobx';
import { SoloGame } from '../SoloGame';
import { Construction } from '../Construction';
import { SoloPhaseManager } from '../SoloPhaseManager';
import { SoloPhase, GameMode } from '../Welcome'

export class SoloGameUIStore {

	@observable private _game: SoloGame;
	@observable private _selectedConstructionIndexes: number[];
	@observable private _selectedHouse: number;
	@observable private _selectedEffectTarget: number;
	@observable private _phaseManager: SoloPhaseManager;

	constructor(game: SoloGame) {
		this.game = game;
		this.reset();
	}

	canGoNext(): boolean {
		console.log('canGoNext', this.phaseManager.currentPhase)
		switch (this.phaseManager.currentPhase) {
			case SoloPhase.ConstructionSelection:
				console.log('on', this.selectedConstructionIndexes.length , this.selectedConstructionIndexes.length === 2)
				return this.selectedConstructionIndexes.length === 2
			case SoloPhase.HouseSelection:
				return !!this.selectedHouse
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

	reset() {
		this.selectedConstructionIndexes = [];
		this.selectedHouse = null;
		this.phaseManager = new SoloPhaseManager()
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

	handleHouseClick = () => {
		console.log('handleHouseClick')
	}
	handleParkClick = () => {
		console.log('handleParkClick')
	}
	handleStreetClick = () => {
		console.log('handleStreetClick')
	}

	get computedConstruction(){
		return new Construction(this.selectedConstructions[0].houseNumber, this.selectedConstructions[1].effect)
	}

	get selectedConstructions(){
		return this.selectedConstructionIndexes.map(i => 
			this.game.manager.constructions.actualCards[i]
		)
	}

	public get game(): SoloGame {
		return this._game;
	}
	public set game(value: SoloGame) {
		this._game = value;
	}
	public get selectedConstructionIndexes(): number[] {
		return this._selectedConstructionIndexes;
	}
	public set selectedConstructionIndexes(value: number[]) {
		this._selectedConstructionIndexes = value;
	}
	public get selectedHouse(): number {
		return this._selectedHouse;
	}
	public set selectedHouse(value: number) {
		this._selectedHouse = value;
	}
	public get selectedEffectTarget(): number {
		return this._selectedEffectTarget;
	}
	public set selectedEffectTarget(value: number) {
		this._selectedEffectTarget = value;
	}
	public get phaseManager(): SoloPhaseManager {
		return this._phaseManager;
	}
	public set phaseManager(value: SoloPhaseManager) {
		this._phaseManager = value;
	}

}