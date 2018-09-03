import { observable } from 'mobx';
import { Game } from '../Game';
import { SoloGame } from '../SoloGame';
import { GameUIStore } from "./GameUIStore";
import { SoloGameUIStore } from "./SoloGameUIStore";
import { WelcomeMapUIStore } from './WelcomeMapUIStore'
import { WelcomeMap } from '../WelcomeMap';
import {Router} from '../../components/Router/Router';
import { Route } from '../../components/Router/Route';

export class UIStore {
	
	@observable	public normalGame: GameUIStore;
	@observable public solo: SoloGameUIStore;
	@observable public map: WelcomeMapUIStore;
	@observable public router: Router;
	
	constructor(soloGame: SoloGame, game: Game, map: WelcomeMap) {
		this.solo = new SoloGameUIStore(soloGame);
		this.normalGame = new GameUIStore(game);
		this.map = new WelcomeMapUIStore(map);
		this.router = new Router()
	}

	reset() {
		this.solo = new SoloGameUIStore(new SoloGame());
	}

	switchRoute(route: Route) {
		this.router.currentRoute = route;
	}
	
}