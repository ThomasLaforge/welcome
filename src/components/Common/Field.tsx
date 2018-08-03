import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../../lib/mobxInjector'

import Fence from './Fence';

import {Field as FieldModel} from '../../modules/Field'
import { MissionType, MapMode, SoloPhase, EffectType } from '../../modules/Welcome';
import { Street } from '../../modules/Street';
import BisZone from '../Solo/EffectZones/BisZone';

interface FieldProps extends DefaultProps {
    field: FieldModel
    position: number
    streetLine: number
    onFieldClick: Function
}
interface FieldState {
}

@inject(injector)
@observer
class Field extends React.Component <FieldProps, FieldState> {

    constructor(props: FieldProps){
        super(props)
        this.state = {
        }
    }
    
    render(){
        let uiSolo = this.props.ui.solo
        let game = this.props.solo
        let inSurveyorPhase = uiSolo.currentPhase === SoloPhase.EffectChoices && uiSolo.computedConstruction.effectType === EffectType.Surveyor
        let inBisPhase = uiSolo.currentPhase === SoloPhase.EffectChoices && uiSolo.computedConstruction.effectType === EffectType.Bis

        let field = this.props.field
        let isHouseSelected = field === uiSolo.selectedHouse

        let fieldClassName = 'house-line-' + this.props.streetLine + '-spot-'+ this.props.position +' house'
        if(isHouseSelected) { fieldClassName += ' ' + 'house-selected' }
        if(     uiSolo.currentPhase === SoloPhase.HouseSelection 
            &&  game.fieldCanBeSelected(field, uiSolo.actualConstructionToBuild)
        ) { 
            fieldClassName += ' ' + 'house-can-be-selected'
        }
        return <div 
            key={this.props.streetLine + '-' + this.props.position} 
            className={fieldClassName} 
            onClick={() => this.props.onFieldClick(field)}
        >
            <div className={field.hasPoolBuilt ? 'house-with-pool-construction-number' : 'house-construction-number'}>
                {(field.construction && field.construction.houseNumber) + (field.isBis() && ' bis') }
            </div>
        </div>
    }
}

export default Field;
