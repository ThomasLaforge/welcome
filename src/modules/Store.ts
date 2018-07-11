import {observable} from 'mobx'

import {WelcomeModulesManager} from './WelcomeModulesManager'

export class UIStore {
    public btndisabled: boolean;
    
    constructor(){
        this.btndisabled = true;
    }
}

export class Store {

    @observable private _uiStore: UIStore;
    @observable private _welcomeStore: WelcomeModulesManager;

    constructor(){
        this.welcomeStore = new WelcomeModulesManager()
        this.uiStore = new UIStore()
    }

	public get uiStore(): UIStore {
		return this._uiStore;
	}
	public set uiStore(value: UIStore) {
		this._uiStore = value;
	}
	public get welcomeStore(): WelcomeModulesManager {
		return this._welcomeStore;
	}
	public set welcomeStore(value: WelcomeModulesManager) {
		this._welcomeStore = value;
	}
    
}