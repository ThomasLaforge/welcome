import {observable, $mobx} from 'mobx'
import * as _ from 'lodash'

import { SoloWelcomeModulesManager } from './SoloWelcomeModulesManager';
import {Player} from './Player'
import { Construction } from './Construction';
import {OptionsPlay, GameMode, PlanLevel, EffectType} from './Welcome'
import { Field } from './Field';
import { Plan } from './Plan';
import { House } from './House';
import { EstateManager } from './EstateManager';

export class SoloGame {

    @observable public player: Player;
    @observable public manager: SoloWelcomeModulesManager;
    @observable public estate: EstateManager;
    public startDate: number;
	@observable public endDate: number;
	@observable public mode: GameMode;
	@observable public nbInterimUsed: number;
	@observable public nbroundaboutUsed: number;
	@observable public nbBisBuilt: number;
	@observable public nbUnbuiltUsed: number;

	constructor(mode = GameMode.Normal, player = new Player(), manager = new SoloWelcomeModulesManager(), estate = new EstateManager(), plansDone = [], startDate = Date.now(), endDate?: number, nbInterimUsed = 0, nbBisBuilt = 0, nbroundaboutUsed = 0, nbUnbuiltUsed = 0) {
		this.player = player;
		this.manager = manager;
		this.estate = estate
		this.startDate = startDate;
		this.endDate = endDate;
		this.mode = mode
		this.nbInterimUsed = nbInterimUsed;
		this.nbBisBuilt = nbBisBuilt
		this.nbroundaboutUsed = nbroundaboutUsed
		this.nbUnbuiltUsed = nbUnbuiltUsed
	}
	
	reset(){
		this.player = new Player()
		this.manager = new SoloWelcomeModulesManager()
		this.estate = new EstateManager()
		this.startDate = Date.now()
		this.endDate = null
		this.mode = GameMode.Normal
		this.nbInterimUsed = 0;
		this.nbBisBuilt = 0;
		this.nbroundaboutUsed = 0;
		this.nbUnbuiltUsed = 0;
	}
    
    play(construction: Construction, field?: Field, options?: OptionsPlay){
	console.log('Game:play', construction, field, options)
		field.build(new House(construction.houseNumber, construction.effect))
		if(options){
			if(construction.effectType === EffectType.Surveyor && options.surveyorFence){
				options.surveyorFence.build()
			}
			else if(construction.effectType === EffectType.RealEstateAgent && !!options.estateChoice){
				this.estate.increment(options.estateChoice)
			}
		}
	}

	getPlansComplete(){
		return this.manager.plans.plansSelected.filter(p => this.isPlanComplete(p))
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

		// console.log('plan complete?', missionObj, districtsObj)

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
		return this.map.getAllBisFieldPossible()
	}

	isPossibleBis(f: Field){
		return this.getAllBisPossible().includes(f)
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

	get allCardsCombinationsUniq(){
		let uniq = []
		this.allCardsCombinations.forEach( (c) => {
			if(uniq.findIndex(uniqConstr => uniqConstr.isEqual(c)) === -1){
				uniq.push(c)
			}
		})

		return uniq
	}

	get allCardsPossibleUniq(){
		return this.allCardsCombinationsUniq.filter(c => this.constructionCanBeConstructed(c))
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
			if(currentHouse.construction && construction.houseNumber <= currentHouse.construction.houseNumber){
				canBeSelected = false
			}
			i++
		}

		// check right is ok
		i = indexOfHouse + 1
		while(canBeSelected && i < street.length){
			let currentHouse = street.fields[i]
			if(currentHouse.construction && construction.houseNumber >= currentHouse.construction.houseNumber){
				canBeSelected = false
			}
			i++
		}

		return canBeSelected
	}

	completePlan(planLevel: PlanLevel){
		// completePlan
		let plan = this.manager.plans.getSelectedPlanByLevel(planLevel)
		this.player.completePlan(plan)

		// mark houses used

	}

	get soloCardHasBeenDrawed(){
		return this.constructions.soloCardHasBeenDrawed
	}

	planScore(planLevel: PlanLevel){
		return 0
	}
	get totalPlanScore(){
		return 0
	}

	parkScore(streetIndex: number){
		return this.map.streets[streetIndex].parkScore 
	}
	get totalParkScore(){
		return this.map.streets.reduce( (total, s) => total + s.parkScore, 0 )
	}
	
	get nbPoolBuilt(){
		return this.map.nbPoolBuilt 
	}
	get totalPoolScore(){
		let scores = [0, 3, 6, 9, 13, 17, 21, 26, 31, 36]
		return scores[this.nbPoolBuilt]
	}
	
	get bisScore(){
		let scores = [0, 1, 3, 6, 9, 12, 16, 20, 24, 28]
		return scores[this.nbBisBuilt]
	}
	get roundaboutScore(){
		// let scores = [0, 3, 8]
		// return scores[this.nbBisBuilt]
		return 0
	}

	get refusalScore(){
		return 0
	}
	
	get interimScore(){
		return this.nbInterimUsed >= 6 ? 7 : 0
	}

	get totalScore(){
		return  this.totalPlanScore
			+	this.totalParkScore
			+	this.totalPoolScore
			+	this.interimScore
			// +	this.totalEstateScore
			-	this.roundaboutScore
			-	this.bisScore
			-	this.refusalScore
	}

	get map(){
		return this.player.map
	}

	get constructions(){
		return this.manager.constructions
	}

	isInAdvancedMode(){
		return this.mode === GameMode.Advanced
	}

	playerHasTooManyRefusal(){
		return this.nbUnbuiltUsed >= 3
	}

	isGameOver(){
		const deckIsEmpty = this.manager.constructions.constructionDeck.isEmpty()

		// const mapIsFull = this.map.isFull()
		const tooManyRefusal = this.playerHasTooManyRefusal()
		// const playerHasBuiltAllPlans = this.player.hasAllPlansDone()
		
		return deckIsEmpty || tooManyRefusal //|| mapIsFull || playerHasBuiltAllPlans
	}
}