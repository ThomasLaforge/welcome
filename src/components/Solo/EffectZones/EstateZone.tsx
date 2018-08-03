import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../../../lib/mobxInjector'

import Button from '@material-ui/core/Button';

import { Construction as ConstructionModel} from '../../../modules/Construction'

interface EstateZoneProps extends DefaultProps {
    estateChoiceSelection: Function
}
interface EstateZoneState {
}

@inject(injector)
@observer
class EstateZone extends React.Component <EstateZoneProps, EstateZoneState> {

    constructor(props: EstateZoneProps){
        super(props)
        this.state = {}
    }

    renderEstateBtns(){
        return <div className='effect-estate-choices'>
            {new Array(6).fill(0).map( (v, i) => {
                let choiceIndex = i + 1
                return <div className={'effect-estate-choices-' + choiceIndex} onClick={() => this.props.estateChoiceSelection(choiceIndex)}>{choiceIndex}</div>
            })}
        </div>
    }

    render() {
        const manager = this.props.manager

        return (
            <div className="estate-zone">
                {this.renderEstateBtns()}
            </div>
        );
    }
}

export default EstateZone;