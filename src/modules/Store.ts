import {observable} from 'mobx'

import {Game} from './Game'
import { WelcomeModulesManager } from './WelcomeModulesManager';
import { SoloGame } from './SoloGame';
import { Route } from './Welcome';

export class UIStore {
	@observable private _game: Game;
	@observable private _activePlayerActionStep: number;
	@observable private _selectedConstructions: number[];
	@observable private _selectedHouse: number;
	@observable private _selectedEffectTarget: number;
	@observable private _route: Route;

    constructor(game: Game){
		this.game = game
		this.reset()
	}

	reset(){
		this.activePlayerActionStep = 0
		this.selectedConstructions = [];
		this.selectedHouse = null;
		this.route = Route.Solo
	}

	switchRoute(route: Route){
		this.route = route
	}

	public get game(): Game {
		return this._game;
	}
	public set game(value: Game) {
		this._game = value;
	}
	public get activePlayerActionStep(): number {
		return this._activePlayerActionStep;
	}
	public set activePlayerActionStep(value: number) {
		this._activePlayerActionStep = value;
	}
	public get selectedConstructions(): number[] {
		return this._selectedConstructions;
	}
	public set selectedConstructions(value: number[]) {
		this._selectedConstructions = value;
	}
	public get selectedHouse(): number {
		return this._selectedHouse;
	}
	public set selectedHouse(value: number) {
		this._selectedHouse = value;
	}
	public get selectedEffectTarget(): number {
		return this._selectedEffectTarget;
	}
	public set selectedEffectTarget(value: number) {
		this._selectedEffectTarget = value;
	}
	public get route(): Route {
		return this._route;
	}
	public set route(value: Route) {
		this._route = value;
	}

}

export class Store {

    @observable private _uiStore: UIStore;
    @observable private _gameStore: Game;
	@observable private _manager: WelcomeModulesManager;
	@observable private _solo: SoloGame;

    constructor(){
        this.gameStore = new Game()
        this.solo = new SoloGame()
		this.uiStore = new UIStore(this.gameStore)
		// this.gameStore.ui = this.uiStore
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