import {observable, $mobx} from 'mobx'
import * as _ from 'lodash'

import { SoloWelcomeModulesManager } from './SoloWelcomeModulesManager';
import {Player} from './Player'
import { Construction } from './Construction';
import {OptionsPlay, GameMode, PlanLevel, EffectType, MAX_NB_ROUNDABOUT_TO_BUILD, PlanMissionType, DEFAULT_GAME_MODE} from './Welcome'
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
	@observable public gameId: string

	constructor(
		gameId?: string,
		mode = DEFAULT_GAME_MODE, 
		player = new Player(), 
		manager = new SoloWelcomeModulesManager(gameId, mode), 
		estate = new EstateManager(),
		startDate = Date.now(), 
		endDate?: number, 
		nbUnbuiltUsed = 0
	) {
		this.player = player;
		this.manager = manager;
		this.estate = estate
		this.startDate = startDate;
		this.endDate = endDate;
		this.mode = mode
		this.nbUnbuiltUsed = nbUnbuiltUsed
		this.gameId = gameId
	}
	
	reset(){
		this.player = new Player()
		this.manager = new SoloWelcomeModulesManager()
		this.estate = new EstateManager()
		this.startDate = Date.now()
		this.endDate = null
		this.mode = DEFAULT_GAME_MODE
		this.nbUnbuiltUsed = 0;
	}

	restart(){
		this.gameId = this.gameId || this.manager.gameId
		this.reset();
		this.manager = new SoloWelcomeModulesManager(this.gameId)
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
		// Check Plan is newly buildable
		this.getPlansNotCompleted().forEach(p => {
			this.planIsBuildable(p) && this.completePlan(p)
		})
	}

	getPlansComplete(){
		return this.manager.plans.plansSelected.filter(p => p.isComplete)
	}
	getPlansNotCompleted(){
		return this.manager.plans.plansSelected.filter(p => !p.isComplete)
	}

	planIsBuildable(p: Plan){
		switch (p.mission.type) {
			case PlanMissionType.Districts:
				let districtForPlans = this.map.getDistrictsForPlansLengths()
				console.log('districtForPlans', districtForPlans);
				let i = 0
				while(i < p.mission.constructionNeeded.length && districtForPlans.indexOf(p.mission.constructionNeeded[i]) !== -1){
					let indexToRemove = districtForPlans.indexOf(p.mission.constructionNeeded[i])
					districtForPlans.splice(indexToRemove, 1)
					i++
				}
				return i === p.mission.constructionNeeded.length
			case PlanMissionType.FiveBis:
				return this.nbBisBuilt >= 5
			case PlanMissionType.BottomStreetFull:
				return this.map.bottomStreet.isFull()
			case PlanMissionType.TopStreetFull:
				return this.map.topStreet.isFull()
			case PlanMissionType.SevenFences:
				return this.map.streets.reduce( (nbFences, s) => nbFences + s.nbFencesBuiltAndNotUsed, 0) >= 7
			case PlanMissionType.Edges:
				return this.map.streets.filter(s => s.firstField.built && s.lastField.built).length === this.map.streets.length
			case PlanMissionType.ParksAndPoolsMiddleLine:
				return this.map.middleStreet.isFullOnPark() && this.map.middleStreet.isFullOnPool()
			case PlanMissionType.ParksAndPoolsBottomLine:
				return this.map.bottomStreet.isFullOnPark() && this.map.bottomStreet.isFullOnPool()
			case PlanMissionType.TwoLineFullPark:
				return this.map.streets.filter(s => s.isFullOnPark()).length >=2
			case PlanMissionType.TwoLineFullPool:
				return this.map.streets.filter(s => s.isFullOnPool()).length >=2
			case PlanMissionType.StreetFullParksAndPoolsWithOneRoundabout:
				return this.map.streets.filter(s => s.hasFullParksAndPoolsWithOneRoundabout).length >= 1
			default:
				throw "not mission type known";
		}
	}

	completePlan(p: Plan){
		// completePlan
		this.player.completePlan(p)

		// mark houses used
		switch (p.mission.type) {
			case PlanMissionType.Districts:
				p.mission.constructionNeeded.forEach(sizeNeeded => {
					this.map.getDistrictsForPlans().find(d => d.length === sizeNeeded).complete()
				})
				break;
			case PlanMissionType.Edges:
				this.map.streets.forEach(s => {
					s.firstField.useForPlan()
					s.lastField.useForPlan()
				})
				break;
			case PlanMissionType.BottomStreetFull:
				this.map.bottomStreet.fields.forEach(f => f.useForPlan())
				break;
			case PlanMissionType.TopStreetFull:
				this.map.topStreet.fields.forEach(f => f.useForPlan())
				break;
			case PlanMissionType.FiveBis:
				this.map.allBis.forEach(bis => bis.useForPlan());
				break;
			case PlanMissionType.SevenFences:
				this.map.streets.forEach(s => s.builtFences.forEach(f => f.useForPlan()));
				break;
			case PlanMissionType.TwoLineFullPool:
				this.map.streets.forEach(s => s.isFullOnPool() && s.allPools.forEach(f => f.useForPlan()));
				break;
			case PlanMissionType.TwoLineFullPark:
				this.map.streets.forEach(s => s.isFullOnPark() && s.allParks.forEach(f => f.useForPlan()));
				break;
			case PlanMissionType.StreetFullParksAndPoolsWithOneRoundabout:
				this.map.streets.find(s => s.hasFullParksAndPoolsWithOneRoundabout).fields.forEach(f => 
					(f.isPool() || f.isPark() || f.isRoundabout()) && f.useForPlan()
				);
				break;
			case PlanMissionType.ParksAndPoolsMiddleLine:
				this.map.middleStreet.fields.forEach(f => (f.hasPool || f.isPark()) && f.useForPlan())
				break;
			case PlanMissionType.ParksAndPoolsBottomLine:
				this.map.bottomStreet.fields.forEach(f => (f.hasPool || f.isPark()) && f.useForPlan())
				break;
			default:
				break;
		}
	}

	isAtLeatOnePlanComplete(){
		return this.getPlansComplete().length > 0
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
		console.log('allCards', this.allCardsCombinations)
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