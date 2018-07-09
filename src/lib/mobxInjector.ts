import {Store} from '../modules/Store'
import {WelcomeModulesManager} from '../modules/WelcomeModulesManager'

export interface InjectedStores {
    store?: Store
}

export interface DefaultProps {
    manager?: WelcomeModulesManager
}

export const injector = (injectContent: InjectedStores) : DefaultProps => ({
    manager: injectContent.store.gameStore as WelcomeModulesManager,
    store: injectContent.store
})