import { observable } from 'mobx';
import { Game } from '../Game';

export class GameUIStore {

	@observable public game: Game;

	constructor(game: Game) {
		this.game = game;
		this.reset();
	}

	reset() {
	}

}