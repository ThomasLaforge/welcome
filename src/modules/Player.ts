import {observable} from 'mobx'
import { WelcomeMap } from './WelcomeMap';

export class Player {

    @observable private _map: WelcomeMap;
    @observable private _name: string;

	constructor(map = new WelcomeMap(), name = 'Thomas') {
		this._map = map;
		this._name = name;
	}

	public get map(): WelcomeMap {
		return this._map;
	}
	public set map(value: WelcomeMap) {
		this._map = value;
	}
	public get name(): string {
		return this._name;
	}
	public set name(value: string) {
		this._name = value;
	}

    
}