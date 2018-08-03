import {observable} from 'mobx'

import { SoloWelcomeModulesManager } from './SoloWelcomeModulesManager';
import {Player} from './Player'
import { Construction } from './Construction';
import {OptionsPlay, GameMode, PlanLevel, EffectType} from './Welcome'
import { Field } from './Field';
import { Plan } from './Plan';

export class SoloGame {

    @observable public player: Player;
    @observable public manager: SoloWelcomeModulesManager;
    public startDate: number;
	@observable public endDate: number;
	@observable public mode: GameMode;
	@observable public plansDone: PlanLevel[];
	@observable public nbInterimUsed: number;
	@observable public nbroundaboutUsed: number;
	@observable public nbBisBuilt: number;
	@observable public nbUnbuiltUsed: number;

	constructor(mode = GameMode.Normal, player = new Player(), manager = new SoloWelcomeModulesManager(), plansDone = [], startDate = Date.now(), endDate?: number, nbInterimUsed = 0, nbBisBuilt = 0, nbroundaboutUsed = 0, nbUnbuiltUsed = 0) {
		this.player = player;
		this.manager = manager;
		this.startDate = startDate;
		this.endDate = endDate;
		this.mode = mode
		this.plansDone = plansDone;
		this.nbInterimUsed = nbInterimUsed;
		this.nbBisBuilt = nbBisBuilt
		this.nbroundaboutUsed = nbroundaboutUsed
		this.nbUnbuiltUsed = nbUnbuiltUsed
	}
	
	reset(){
		this.player = new Player()
		this.manager = new SoloWelcomeModulesManager()
		this.startDate = Date.now()
		this.endDate = null
		this.mode = GameMode.Normal
		this.plansDone = [];
		this.nbInterimUsed = 0;
		this.nbBisBuilt = 0;
		this.nbroundaboutUsed = 0;
		this.nbUnbuiltUsed = 0;
	}
    
    play(construction: Construction, house?: Field, options?: OptionsPlay){
		console.log('Game:play', construction, house, options)
		house.build(construction)
		if(options){
			if(options.surveyorFence){
				options.surveyorFence.build()
			}
		}
	}

	getPlansComplete(){
		return this.manager.plans.plans.filter(p => this.isPlanComplete(p))
	}

	isAtLeatOnePlanComplete(){
		return this.getPlansComplete().length > 0
	}

	isPlanComplete(p:Plan){
		let mission = p.mission.constructionNeeded
		let ownDistrictLengths = this.map.getDistrictsForPlansLengths()
		const objectifyMission = (mission: number[]) => {
			let obj = {}
			mission.forEach(elt => {
				obj[elt] = obj[elt] || 0
				obj[elt]++
			})
			return obj
		}

		let missionObj = objectifyMission(mission)
		let districtsObj = objectifyMission(ownDistrictLengths)

		console.log('plan complete?', missionObj, districtsObj)

		let constructionSizes = Object.keys(missionObj)
		let constructionLengthAvailable = (i) => {
			let constructionLengthToTest = constructionSizes[i]
			return districtsObj[constructionLengthToTest] >= missionObj[constructionLengthToTest]
		}

		let i = 0
		while(i < constructionSizes.length && constructionLengthAvailable(i)){
			i++
		}

		return i === constructionSizes.length
	}

	getAllHouseConstructable(construction: Construction){
		let houses = []
		this.map.streets.forEach(s => {
			houses = houses.concat(s.fields.filter(h => this.fieldCanBeSelected(h, construction)))
		})
		return houses
	}

	constructionCanBeConstructed(construction: Construction){
		return !!this.getAllHouseConstructable(construction).length
	}

	getAllBisPossible(){
		return this.map.getAllBisPossible()
	}

	get possibleCards(){
		return this.allCardsCombinations.filter(c => this.constructionCanBeConstructed(c))
	}
	
	get allCardsCombinations(){
		let possibleCards: Construction[] = []
		let cards = this.manager.constructions.actualCards
        for (let i = 0; i < cards.length; i++) {
            for (let j = 0; j < cards.length; j++) {
                if(i !== j){
                    let cardA = cards[i]
					let cardB = cards[j]
					let computedConstruction = new Construction(cardB.houseNumber, cardA.effect)
					possibleCards.push(computedConstruction)
                }                
            }            
		}
		// Reorder for UI. Maybe in UI (Css: flex order / React render)
        return [
			possibleCards[0],
			possibleCards[2],
			possibleCards[4],
			possibleCards[1],
			possibleCards[3],
			possibleCards[5]
		]
		// return possibleCards
	}

	cardIsDisabled(c: Construction){
		return this.possibleCards.filter(card => c.isEqual(card)).length === 0
	}

	fieldCanBeSelected(h: Field, construction: Construction){
		let canBeSelected = !h.built
		let street = this.map.getStreetOfHouse(h)
		let indexOfHouse = street.fields.indexOf(h)
		let i;

		// check left is ok
		i = 0
		while(canBeSelected && i < indexOfHouse){
			let currentHouse = street.fields[i]
			if(currentHouse.construction && construction.houseNumber < currentHouse.construction.houseNumber){
				canBeSelected = false
			}
			i++
		}

		// check right is ok
		i = indexOfHouse + 1
		while(canBeSelected && i < street.length){
			let currentHouse = street.fields[i]
			if(currentHouse.construction && construction.houseNumber > currentHouse.construction.houseNumber){
				canBeSelected = false
			}
			i++
		}

		return canBeSelected
	}

	completePlan(planLevel: PlanLevel){
		// win reward
		
		// completePlan
		this.plansDone.push(planLevel)

		// mark houses used

	}

	planScore(planLevel: PlanLevel){
		return 0
	}
	get totalPlanScore(){
		return 0
	}

	parkScore(streetIndex: number){
		return this.player.map.streets[streetIndex].parkScore 
	}
	get totalParkScore(){
		return 0
	}
	
	get nbPoolBuilt(){
		return this.player.nbPoolBuilt
	}
	get totalPoolScore(){
		return 0
	}
	
	get bisScore(){
		let scores = [0, 1, 3, 6, 9, 12, 16, 20, 24, 28]
		return scores[this.nbBisBuilt]
	}
	get roundaboutScore(){
		let scores = [0, 3, 8]
		return scores[this.nbBisBuilt]
	}
	
	get InterimScore(){
		return this.nbInterimUsed >= 6 ? 7 : 0
	}

	get totalScore(){
		return 0
	}

	get map(){
		return this.player.map
	}

	isInAdvancedMode(){
		return this.mode === GameMode.Advanced
	}
}