import { UIStore } from './Stores/UIStore';

import {observable} from 'mobx'

import {Game} from './Game'
import { WelcomeModulesManager } from './WelcomeModulesManager';
import { SoloGame } from './SoloGame';
import { WelcomeMap } from './WelcomeMap';

export class Store {

    @observable public uiStore: UIStore;
    @observable public gameStore: Game;
	@observable public manager: WelcomeModulesManager;
	@observable public solo: SoloGame;
	@observable public map: WelcomeMap;

    constructor(){
        this.gameStore = new Game()
        this.solo = new SoloGame()
		this.map = new WelcomeMap()
		this.uiStore = new UIStore(this.solo, this.gameStore, this.map)
		this.manager = new WelcomeModulesManager()
	}
	
	reset(){
		this.resetMap()
		this.resetManager()
		this.resetGameStore()
		this.resetSolo()
		this.resetUiStore()
	}

	resetMap(){
		this.map.reset()
	}

	resetSolo(){
		this.solo.reset()
	}

	resetGameStore(){
		this.gameStore.reset()
	}

	resetUiStore(){
		this.uiStore.reset()
	}

	resetManager(){
		this.manager.reset()
	}
}