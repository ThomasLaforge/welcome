import * as React from 'react'
import { RouteEnum } from '../../modules/Welcome';

export interface IRoute {
    path: string
    component: React.ComponentClass
    type: RouteEnum
}

export class Route {

    public path: string;
    public component: React.ComponentClass
    public type: RouteEnum

    constructor(route: IRoute){
        this.path = route.path
        this.component = route.component
        this.type = route.type
    }
}