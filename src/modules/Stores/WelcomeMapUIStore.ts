import { observable } from 'mobx';
import { WelcomeMap } from '../WelcomeMap';
import { Field } from '../Field';
import { SoloGame } from '../SoloGame';
import { House } from '../House';
import { Effect } from '../Effect';
import { EffectType } from '../Welcome';

export class WelcomeMapUIStore {
    @observable public solo: SoloGame;
	@observable public map: WelcomeMap;
    @observable public selectedPlanIndex: number;
    @observable public selectedField: Field;

	constructor(map: WelcomeMap, solo = new SoloGame()) {
        this.map = map;
        this.solo = solo;
		this.reset();
    }
    
    inPlanSelectionMode(){
        return this.selectedPlanIndex || this.selectedPlanIndex === 0
    }
    inFieldSelectionMode(){
        return !!this.selectedField
    }

    handleFieldClick = (f: Field) => {
        this.selectedPlanIndex = null
        this.selectedField = f
    }

    handlePlanClick = (index: number) => {
        console.log('handle plan click', index)
        this.selectedField = null
        this.selectedPlanIndex = index
    }

    handleNumberClick = (number: number) => {
        console.log('on number click', number)
        if(this.selectedField){
            this.selectedField.build(new House(number))
        }
    }

    onParkClick = () => {
        console.log('on park click')
        if(this.selectedField.built){
            let isPark = this.selectedField.effectType === EffectType.Landscaper 
            let newEffect = isPark ? null : new Effect(EffectType.Landscaper)
            this.selectedField.build(new House(this.selectedField.houseNumber, newEffect))
        }
    }

    onPoolClick = () => {
        console.log('on pool click')
        if(this.selectedField.built){
            let isPool = this.selectedField.effectType === EffectType.PoolManufacturer 
            let newEffect = isPool ? null : new Effect(EffectType.PoolManufacturer)
            this.selectedField.build(new House(this.selectedField.houseNumber, newEffect))
        }
    }
    
    onInterimClick = () => {
        console.log('on interim click')
        if(this.selectedField.built){
            let isInterim = this.selectedField.effectType === EffectType.Interim 
            let newEffect = isInterim ? null : new Effect(EffectType.Interim)
            this.selectedField.build(new House(this.selectedField.houseNumber, newEffect))
        }
    }

    onRoundaboutClick = () => {
        console.log('on roundabout click')
        if(!!this.selectedField){
            this.solo.buildRoundabout(this.selectedField)
        }
    }
    
    onLeftFenceClick = () => {
        console.log('on left fence click')
        if(this.selectedField){
            let fencePos = this.selectedField.position - 1
            let fence = this.map.streets[this.selectedField.streetLine].fences[fencePos]
            if(fence){
                fence.built ? fence.destroy() : fence.build()
            }
        }
    }
    
    onRightFenceClick = () => {
        console.log('on right fence click')
        if(this.selectedField){
            let fencePos = this.selectedField.position
            let fence = this.map.streets[this.selectedField.streetLine].fences[fencePos]
            if(fence){
                fence.built ? fence.destroy() : fence.build()
            }
        }
    }

    onBisClick = () => {
        console.log('on bis click');
        if(this.selectedField && this.solo.isPossibleBis(this.selectedField)){
            this.selectedField.destroy()
            this.solo.buildBis(this.selectedField)
        }
    }

    handleEstateClick = (number: number) => {
        console.log('on estate click', number)
        this.solo.estate.increment(number)
    }

    handleApply = () => {
        console.log('handle apply')
    }

    handleResetField = () => {
        console.log('handle reset field');
        if(this.selectedField){
            this.selectedField.destroy()
        }
    }

    handleRejection = () => {
        this.solo.nbUnbuiltUsed++
    }

    get mode(){
        return this.solo.mode
    }

	reset() {
        this.map.reset()
	}

    debug = () =>{
        console.log('districts', this.map.getDistrictsForPlansLengths())
    }

    get selectedFieldIsPark(){
        return this.selectedField.effectType === EffectType.Landscaper
    }

}