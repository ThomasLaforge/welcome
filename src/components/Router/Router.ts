import { Route, IRoute } from "./Route";
import { observable } from "mobx";

import SoloGame from '../Solo/SoloGame'
import Manager from '../Manager/Manager'
import MapModule from '../Map/MapModule'
import Home from '../Home/Home'
import { RouteEnum } from "../../modules/Welcome";

export class Router {
    public routes: Route[]
    @observable public currentRoute: Route;

    constructor(){
        let routeDefs: IRoute[] = [
            {
                path: '/',
                component: Home,
                type: RouteEnum.Home
            },
            {
                path: '/map',
                component: MapModule,
                type: RouteEnum.Map
            },
            {
                path: './solo',
                component: SoloGame,
                type: RouteEnum.Solo
            },
            {
                path: './manager',
                component: Manager,
                type: RouteEnum.Manager
            }

        ]
        this.routes = routeDefs.map(iRoute => new Route(iRoute))
        this.switchRoute(this.routes[0].type)

    }

    switchRoute(routeType: RouteEnum){
        let route = this.routes.find(r => r.type === routeType)
        this.currentRoute = route
        this.setWindowHistory()
    }

    setWindowHistory(){
        window.history.pushState({}, "page 2", this.currentRoute.path);
    }

}