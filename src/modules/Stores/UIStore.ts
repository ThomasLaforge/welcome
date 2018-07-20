import { observable } from 'mobx';
import { Game } from '../Game';
import { SoloGame } from '../SoloGame';
import { Route } from '../Welcome';
import { GameUIStore } from "./GameUIStore";
import { SoloGameUIStore } from "./SoloGameUIStore";

export class UIStore {
	
	@observable	private _normalGame: GameUIStore;
	@observable private _solo: SoloGameUIStore;
	@observable private _route: Route;
	
	constructor(soloGame: SoloGame, game: Game) {
		this.solo = new SoloGameUIStore(soloGame);
		this.normalGame = new GameUIStore(game);
	}

	reset() {
		this.solo = new SoloGameUIStore(new SoloGame());
	}

	switchRoute(route: Route) {
		this.route = route;
	}
	
	public get normalGame(): GameUIStore {
		return this._normalGame;
	}
	public set normalGame(value: GameUIStore) {
		this._normalGame = value;
	}
	public get solo(): SoloGameUIStore {
		return this._solo;
	}
	public set solo(value: SoloGameUIStore) {
		this._solo = value;
	}
	public get route(): Route {
		return this._route || Route.Solo;
	}
	public set route(value: Route) {
		this._route = value;
	}
}