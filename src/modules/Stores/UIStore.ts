import { observable } from 'mobx';
import { Game } from '../Game';
import { SoloGame } from '../SoloGame';
import { Route } from '../Welcome';
import { GameUIStore } from "./GameUIStore";
import { SoloGameUIStore } from "./SoloGameUIStore";

export class UIStore {
	
	@observable	public normalGame: GameUIStore;
	@observable public solo: SoloGameUIStore;
	@observable public route: Route;
	
	constructor(soloGame: SoloGame, game: Game, defaultRoute = Route.Solo) {
		this.solo = new SoloGameUIStore(soloGame);
		this.normalGame = new GameUIStore(game);
		this.route = defaultRoute
	}

	reset() {
		this.solo = new SoloGameUIStore(new SoloGame());
	}

	switchRoute(route: Route) {
		this.route = route;
	}
	
}