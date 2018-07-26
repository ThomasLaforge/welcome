import {observable} from 'mobx'
import { WelcomeMap } from './WelcomeMap';

export class Player {

    @observable public map: WelcomeMap;
    @observable public name: string;

	constructor(map = new WelcomeMap(), name = 'Thomas') {
		this.map = map;
		this.name = name;
	}
	
	get nbPoolBuilt(){
		return this.map.nbPoolBuilt 
	}
}