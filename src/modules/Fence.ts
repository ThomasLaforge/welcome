import {observable} from 'mobx'

export class Fence {
    public position: number;
    public street: number;
    @observable public built: boolean;
    @observable public usedForPlan: boolean;

    constructor(position: number, street: number, built = false, usedForPlan = false){
        this.street = street
        this.position = position
        this.built = built
        this.usedForPlan = usedForPlan
    }

    build(){
        this.built = true
    }

    destroy = this.unbuild
    unbuild(){
        this.built = false
    }

    get notBuilt(){
        return !this.built
    }

    useForPlan(){
        return this.usedForPlan = true
    }
}