import { UIStore } from './Stores/UIStore';

import {observable} from 'mobx'

import {Game} from './Game'
import { WelcomeModulesManager } from './WelcomeModulesManager';
import { SoloGame } from './SoloGame';

export class Store {

    @observable private _uiStore: UIStore;
    @observable private _gameStore: Game;
	@observable private _manager: WelcomeModulesManager;
	@observable private _solo: SoloGame;

    constructor(){
        this.gameStore = new Game()
        this.solo = new SoloGame()
		this.uiStore = new UIStore(this.solo, this.gameStore)
		this.manager = new WelcomeModulesManager()
	}
	
	reset(){
		this.gameStore.reset()
		this.uiStore.reset()
		this.manager.reset()
	}

	public get uiStore(): UIStore {
		return this._uiStore;
	}
	public set uiStore(value: UIStore) {
		this._uiStore = value;
	}
	public get gameStore(): Game {
		return this._gameStore;
	}
	public set gameStore(value: Game) {
		this._gameStore = value;
	}
	public get manager(): WelcomeModulesManager {
		return this._manager;
	}
	public set manager(value: WelcomeModulesManager) {
		this._manager = value;
	}
	public get solo(): SoloGame {
		return this._solo;
	}
	public set solo(value: SoloGame) {
		this._solo = value;
	}

}