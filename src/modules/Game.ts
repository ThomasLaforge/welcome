import {observable} from 'mobx'

import { WelcomeModulesManager } from './WelcomeModulesManager';
import {Player} from './Player'
import { Construction } from './Construction';
import {PlayOptions} from './Welcome'
import { House } from './House';

export class Game {

    @observable private _players: Player[];
    @observable private _manager: WelcomeModulesManager;
    private _startDate: number;
    @observable private endDate: number;

	constructor(players = [new Player()], manager = new WelcomeModulesManager(), startDate = Date.now(), endDate?: number) {
		this._players = players;
		this._manager = manager;
		this._startDate = startDate;
		this.endDate = endDate;
	}
	
	reset(){
		this.players = [new Player()]
		this.manager = new WelcomeModulesManager()
		this.startDate = Date.now()
		this.endDate = null
	}
    
    play(construction: Construction, player: Player, house?: House, options?: PlayOptions){
        console.log('Game:play', construction, house, options, player)
	}

	public get players(): Player[] {
		return this._players;
	}
	public set players(value: Player[]) {
		this._players = value;
	}
	public get manager(): WelcomeModulesManager {
		return this._manager;
	}
	public set manager(value: WelcomeModulesManager) {
		this._manager = value;
	}
	public get startDate(): number {
		return this._startDate;
	}
	public set startDate(value: number) {
		this._startDate = value;
	}
	public get $endDate(): number {
		return this.endDate;
	}
	public set $endDate(value: number) {
		this.endDate = value;
	}


}