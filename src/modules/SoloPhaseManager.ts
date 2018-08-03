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
        let nbPhases = Object.keys(SoloPhase).length / 2
        return nbPhases
    }

    next(){
        this.currentPhase++
        if(this.mode === GameMode.Normal && this.currentPhase === SoloPhase.RoundAbout){
            console.log('next cause normal mode and in roundabout phase')
            this.next()
        }
        console.log('next', this.length, this.currentPhase)
        if(this.currentPhase === this.length){
            console.log('next: end to start')
            this.currentPhase = SoloPhase.ConstructionSelection
        }
    }

    back(){
        this.currentPhase--
        if(this.mode === GameMode.Normal && this.currentPhase === SoloPhase.RoundAbout){
            this.back()
        }
        if(this.currentPhase < SoloPhase.ConstructionSelection){
            this.currentPhase = SoloPhase.ConstructionSelection
        }
    }

    goTo(newPhase: SoloPhase){
        this.currentPhase = newPhase
    }

    progress(){
        return this.length
    }

}