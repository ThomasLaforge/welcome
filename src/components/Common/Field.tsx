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
    selectedField: FieldModel
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
        let inBisPhase = uiSolo.currentPhase === SoloPhase.EffectChoices && uiSolo.computedConstruction.effectType === EffectType.Bis
        let inHouseSelectionPhase = uiSolo.currentPhase === SoloPhase.HouseSelection
        let inSummaryPhase = uiSolo.currentPhase === SoloPhase.Confirmation

        let field = this.props.field
        let isHouseSelected = this.props.selectedField && field.isEqual(this.props.selectedField)
        let isHouseSelectedForBis = (inBisPhase || inSummaryPhase) && !!uiSolo.optionsPlay.bisField && uiSolo.optionsPlay.bisField.isEqual(field)

        let fieldClassName = 'field-line-' + this.props.streetLine + '-spot-'+ this.props.position +' house'
        if(isHouseSelected) { fieldClassName += ' ' + 'field-selected' }
        if(isHouseSelectedForBis) { fieldClassName += ' ' + 'field-selected-for-bis' }
        if( inHouseSelectionPhase &&  game.fieldCanBeSelected(field, uiSolo.actualConstructionToBuild) ) { 
            fieldClassName += ' ' + 'field-can-be-selected'
        }
        if( inBisPhase && game.isPossibleBis(field) ) { 
            fieldClassName += ' ' + 'field-can-be-selected-for-bis'
        }
        if( field.isBis() ) { 
            fieldClassName += ' ' + 'field-bis'
        }

        return <div 
            key={this.props.streetLine + '-' + this.props.position} 
            className={fieldClassName} 
            onClick={() => this.props.onFieldClick(field)}
        >
            <div className={field.hasPoolBuilt ? 'field-with-pool-construction-number' : 'field-construction-number'}>
                {field.construction && field.construction.houseNumber} {field.isBis() && 'bis'}
            </div>
        </div>
    }
}

export default Field;