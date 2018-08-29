import {observable} from 'mobx'

export class Fence {
    public position: number;
    public street: number;
    @observable public built: boolean;

    constructor(position: number, street: number, built = false){
        this.street = street
        this.position = position
        this.built = built
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
}