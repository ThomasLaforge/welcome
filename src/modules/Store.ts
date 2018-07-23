import { UIStore } from './Stores/UIStore';

import {observable} from 'mobx'

import {Game} from './Game'
import { WelcomeModulesManager } from './WelcomeModulesManager';
import { SoloGame } from './SoloGame';

export class Store {

    @observable public uiStore: UIStore;
    @observable public gameStore: Game;
	@observable public manager: WelcomeModulesManager;
	@observable public solo: SoloGame;

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

}