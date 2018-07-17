import {Store, UIStore} from '../modules/Store'
import {Game} from '../modules/Game'
import { WelcomeModulesManager } from '../modules/WelcomeModulesManager';
import { SoloGame } from '../modules/SoloGame';
// import {History} from '../modules/History'

export interface InjectedStores {
    store?: Store
}

export interface DefaultProps {
    game?: Game
    ui?: UIStore
    // store?: Store
    manager?: WelcomeModulesManager
    solo?: SoloGame
}

export const injector = (injectContent: InjectedStores) : DefaultProps => ({
    game: injectContent.store.gameStore as Game,
    ui: injectContent.store.uiStore as UIStore,
    manager: injectContent.store.manager as WelcomeModulesManager,
    solo: injectContent.store.solo as SoloGame
    // store: injectContent.store
})