import { observable } from 'mobx';
import { Game } from '../Game';

export class GameUIStore {

	@observable private _game: Game;

	constructor(game: Game) {
		this.game = game;
		this.reset();
	}

	reset() {
	}
	
	public get game(): Game {
		return this._game;
	}
	public set game(value: Game) {
		this._game = value;
	}
}