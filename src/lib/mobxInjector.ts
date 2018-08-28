import {Store} from '../modules/Store'
import { UIStore } from "../modules/Stores/UIStore";
import {Game} from '../modules/Game'
import { WelcomeModulesManager } from '../modules/WelcomeModulesManager';
import { SoloGame } from '../modules/SoloGame';
import { WelcomeMap } from '../modules/WelcomeMap';
// import {History} from '../modules/History'

export interface InjectedStores {
    store?: Store
}

export interface DefaultProps {
    game?: Game
    ui?: UIStore
    manager?: WelcomeModulesManager
    solo?: SoloGame
    map?: WelcomeMap
    // store?: Store
}

export const injector = (injectContent: InjectedStores) : DefaultProps => ({
    game: injectContent.store.gameStore as Game,
    ui: injectContent.store.uiStore as UIStore,
    manager: injectContent.store.manager as WelcomeModulesManager,
    solo: injectContent.store.solo as SoloGame,
    map: injectContent.store.map as WelcomeMap
    // store: injectContent.store
})