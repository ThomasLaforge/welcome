import {observable} from 'mobx'

import { SoloWelcomeModulesManager } from './SoloWelcomeModulesManager';
import {Player} from './Player'
import { Construction } from './Construction';
import {PlayOptions} from './Welcome'
import { House } from './House';

export class SoloGame {

    @observable private _player: Player;
    @observable private _manager: SoloWelcomeModulesManager;
    private _startDate: number;
    @observable private endDate: number;

	constructor(player = new Player(), manager = new SoloWelcomeModulesManager(), startDate = Date.now(), endDate?: number) {
		this._player = player;
		this._manager = manager;
		this._startDate = startDate;
		this.endDate = endDate;
	}
	
	reset(){
		this.player = new Player()
		this.manager = new SoloWelcomeModulesManager()
		this.startDate = Date.now()
		this.endDate = null
	}
    
    play(construction: Construction, player: Player, house?: House, options?: PlayOptions){
        console.log('Game:play', construction, house, options, player)
	}

	public get player(): Player {
		return this._player;
	}
	public set player(value: Player) {
		this._player = value;
	}
	public get manager(): SoloWelcomeModulesManager {
		return this._manager;
	}
	public set manager(value: SoloWelcomeModulesManager) {
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