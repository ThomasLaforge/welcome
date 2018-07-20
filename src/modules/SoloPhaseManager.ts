import { observable } from "mobx";

import {SoloPhase, GameMode} from './Welcome'

export class SoloPhaseManager {

    @observable public currentPhase: SoloPhase;
    @observable public mode: GameMode;

    constructor(initialPhase = SoloPhase.ConstructionSelection, mode = GameMode.Normal){
        this.currentPhase = initialPhase
        this.mode = mode
    }

    get length(){
        return Object.keys(SoloPhase).length / 2
    }

    next(){
        this.currentPhase++
        if(this.mode === GameMode.Advanced && this.currentPhase === SoloPhase.RoundAbout){
            this.next()
        }
        if(this.currentPhase === this.length){
            this.currentPhase = SoloPhase.ConstructionSelection
        }
    }

    back(){
        this.currentPhase--
        if(this.mode === GameMode.Advanced && this.currentPhase === SoloPhase.RoundAbout){
            this.back()
        }
        if(this.currentPhase < SoloPhase.ConstructionSelection){
            this.currentPhase = SoloPhase.ConstructionSelection
        }
    }

    goTo(newPhase: SoloPhase){
        this.currentPhase = newPhase
    }

}