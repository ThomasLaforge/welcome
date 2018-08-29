import {observable, $mobx} from 'mobx'
import * as _ from 'lodash'

import { SoloWelcomeModulesManager } from './SoloWelcomeModulesManager';
import {Player} from './Player'
import { Construction } from './Construction';
import {OptionsPlay, GameMode, PlanLevel, EffectType, MAX_NB_ROUNDABOUT_TO_BUILD} from './Welcome'
import { Field } from './Field';
import { Plan } from './Plan';
import { House } from './House';
import { EstateManager } from './EstateManager';
import { Bis } from './Bis';
import { RoundAbout } from './RoundAbout';

// export class SoloGame extends Game {
export class SoloGame {

    @observable public player: Player;
    @observable public manager: SoloWelcomeModulesManager;
    @observable public estate: EstateManager;
    public startDate: number;
	@observable public endDate: number;
	@observable public mode: GameMode;
	@observable public nbUnbuiltUsed: number;

	constructor(mode = GameMode.Normal, player = new Player(), manager = new SoloWelcomeModulesManager(), estate = new EstateManager(), plansDone = [], startDate = Date.now(), endDate?: number, nbInterimUsed = 0, nbBisBuilt = 0, nbroundaboutUsed = 0, nbUnbuiltUsed = 0) {
		this.player = player;
		this.manager = manager;
		this.estate = estate
		this.startDate = startDate;
		this.endDate = endDate;
		this.mode = mode
		this.nbUnbuiltUsed = nbUnbuiltUsed
	}
	
	reset(){
		this.player = new Player()
		this.manager = new SoloWelcomeModulesManager()
		this.estate = new EstateManager()
		this.startDate = Date.now()
		this.endDate = null
		this.mode = GameMode.Normal
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
			else if(construction.effectType === EffectType.Bis && !!options.bisField){
				this.buildBis(options.bisField)
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
		return this.getAllBisPossible().filter(field => field.isEqual(f)).length === 1
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
		let uniq: Construction[] = []
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

	buildBis(bisField: Field){
		let value;
		let fieldPos = bisField.position
		let street = this.map.streets[bisField.streetLine]

		// get left value
		if(fieldPos > 0 && street.fields[fieldPos - 1].built){
			value = street.fields[fieldPos - 1].construction.houseNumber
		}
		// if not left value => get right value
		else if(fieldPos < street.length - 1 && street.fields[fieldPos + 1].built){
			value = street.fields[fieldPos + 1].construction.houseNumber
		}
		else {
			console.error('build bis is not possible', bisField)
			return
		} 

		// if value build it
		bisField.build(new Bis(value))
	}

	buildRoundabout(f: Field){
		if(this.nbRoundaboutUsed < MAX_NB_ROUNDABOUT_TO_BUILD){
			f.build(new RoundAbout())
		}
	}	

	get soloCardHasBeenDrawed(){
		return this.constructions.soloCardHasBeenDrawed
	}

	planScore(planLevel: PlanLevel){
		let plan = this.player.completedPlans && this.player.completedPlans.length >= planLevel + 1 && this.player.completedPlans.find(p => p && p.level === planLevel)
		return plan ? plan.getScore() : 0
	}
	get totalPlanScore(){
		return this.player.planScore
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
		let indexPoolScore = this.nbPoolBuilt < scores.length ? this.nbPoolBuilt : scores.length - 1
		return scores[indexPoolScore]
	}

	get nbBisBuilt(){
		return this.map.streets.reduce( (sum: number, s) => sum + s.fields.filter(f => f.isBis()).length, 0)
	}
	
	get bisScore(){
		let scores = [0, 1, 3, 6, 9, 12, 16, 20, 24, 28]
		return -1 * scores[this.nbBisBuilt]
	}

	get refusalScore(){
		const refusalScores = [0, 0, 3, 5]
		return -1 * refusalScores[this.nbUnbuiltUsed]
	}

	get nbRoundaboutUsed(){
		return this.map.streets.reduce( (sum: number, s) => sum + s.fields.filter(f => f.isRoundabout()).length, 0)
	}

	get roundaboutScore(){
		let scores = [0, 3, 8]
		return -1 * scores[this.nbRoundaboutUsed]
	}

	get nbInterimUsed(){
		return this.map.streets.reduce( (sum: number, s) => sum + s.fields.filter(f => f.isHouse() && (f.construction as House).effectType === EffectType.Interim).length, 0)
	}
	
	get interimScore(){
		return this.nbInterimUsed >= 6 ? 7 : 0
	}

	get totalEstateScore(){
		let total = 0
		for (let i = 1; i <= 6; i++) {
            let nbDistrictOfSize = this.map.getNbCompleteDistricts(i) 
            let multiplicator = this.estate.getMultiplicator(i)
			let score = nbDistrictOfSize * multiplicator
			total += score
		}
		return total
	}

	get totalScore(){
		return  this.totalPlanScore
			+	this.totalParkScore
			+	this.totalPoolScore
			+	this.interimScore
			+	this.totalEstateScore
			+	this.roundaboutScore
			+	this.bisScore
			+	this.refusalScore
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