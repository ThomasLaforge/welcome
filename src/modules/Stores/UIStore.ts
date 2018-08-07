import { observable } from 'mobx';
import { Game } from '../Game';
import { SoloGame } from '../SoloGame';
import { Route } from '../Welcome';
import { GameUIStore } from "./GameUIStore";
import { SoloGameUIStore } from "./SoloGameUIStore";

const DEFAULT_ROUTE = Route.Solo

export class UIStore {
	
	@observable	public normalGame: GameUIStore;
	@observable public solo: SoloGameUIStore;
	@observable public route: Route;
	
	constructor(soloGame: SoloGame, game: Game, defaultRoute = DEFAULT_ROUTE) {
		this.solo = new SoloGameUIStore(soloGame);
		this.normalGame = new GameUIStore(game);
		this.route = defaultRoute
	}

	reset() {
		this.solo = new SoloGameUIStore(new SoloGame());
	}

	switchRoute(route = DEFAULT_ROUTE) {
		this.route = route;
	}
	
}