import {observable} from 'mobx'

export class Fence {
    public position: number;
    @observable built: boolean;

    constructor(position: number, built = false){
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

}