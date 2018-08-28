import { observable } from 'mobx';
import { Game } from '../Game';
import { SoloGame } from '../SoloGame';
import { Route } from '../Welcome';
import { GameUIStore } from "./GameUIStore";
import { SoloGameUIStore } from "./SoloGameUIStore";
import { WelcomeMapUIStore } from './WelcomeMapUIStore'
import { WelcomeMap } from '../WelcomeMap';

const DEFAULT_ROUTE = Route.Map

export class UIStore {
	
	@observable	public normalGame: GameUIStore;
	@observable public solo: SoloGameUIStore;
	@observable public map: WelcomeMapUIStore;
	@observable public route: Route;
	
	constructor(soloGame: SoloGame, game: Game, map: WelcomeMap, defaultRoute = DEFAULT_ROUTE) {
		this.solo = new SoloGameUIStore(soloGame);
		this.normalGame = new GameUIStore(game);
		this.map = new WelcomeMapUIStore(map);
		this.route = defaultRoute
	}

	reset() {
		this.solo = new SoloGameUIStore(new SoloGame());
	}

	switchRoute(route = DEFAULT_ROUTE) {
		this.route = route;
	}
	
}