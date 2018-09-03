import {observable} from 'mobx'
// imports

import {PlanModule} from './PlanModule'
import {SoloConstructionModule} from './SoloConstructionModule'
import { GameMode, HASH_SPACER, DEFAULT_GAME_MODE } from './Welcome';
import { hasher } from './Hasher';
import { numberArray_split } from './utils';
// -------

interface SoloWelcomeModulesManagerData {
	gameMode: GameMode,
	planShuffler: number[],
	constructionShuffler: number[],
	indexSpecialSoloCard: number
}

export class SoloWelcomeModulesManager {

    @observable public constructions: SoloConstructionModule;
	@observable public plans: PlanModule;
	@observable public mode: GameMode;
	@observable public gameId: string;

	constructor(gameId?: string, mode = DEFAULT_GAME_MODE){
		this.init(gameId, mode)
	}

	init(gameId?: string, mode?: GameMode){
		let gamesParams: SoloWelcomeModulesManagerData
		if(!!gameId){
			gamesParams = this.decodedGameInfo
		}
		this.mode = !!gameId ? this.decodedGameInfo.gameMode : mode

		this.constructions = new SoloConstructionModule(gamesParams && gamesParams.constructionShuffler, gamesParams && gamesParams.indexSpecialSoloCard)
		this.plans = new PlanModule(this.mode, gamesParams && gamesParams.planShuffler)

		// case
		this.gameId = this.getGameId()
	}
	reset(useGameId = false){
		this.init(useGameId ? this.gameId : null)
	}

	getGameId(){
		const constructionDeck = this.constructions.constructionDeck
		const planDeck = this.constructions.constructionDeck
		let completeArray = [].concat(this.mode, HASH_SPACER, constructionDeck.shuffler, HASH_SPACER, constructionDeck.specialCardIndex, HASH_SPACER, planDeck.shuffler)
		let hash = hasher.encode(completeArray)
		console.log('hash', hash, hasher.decode(hash), completeArray)
		return hasher.encode(completeArray)
	}

	get decodedGameInfo() : SoloWelcomeModulesManagerData {
		if(!this.gameId){
			return null
		}
		
		let decodedHash = hasher.decode(this.gameId)
		let split = numberArray_split(decodedHash, HASH_SPACER)
		let gameMode = split[0][0]
		let constructionShuffler = split[1]
		let indexSpecialSoloCard = split[2][0]
		let planShuffler = split[3]

		return {
			gameMode,
			planShuffler,
			constructionShuffler,
			indexSpecialSoloCard
		}
	}

	get remainingTurn(){
		return this.constructions.remainingTurn
	}
	
}