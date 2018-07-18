import { observable } from "../../node_modules/mobx";

import {Phase} from './Welcome'

export class PhaseManager {

    @observable public currentPhase: Phase;

    constructor(initialPhase = Phase.ConstructionSelection){
        this.currentPhase = initialPhase
    }

    

}