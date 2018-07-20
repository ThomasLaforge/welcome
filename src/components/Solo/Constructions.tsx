import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../../lib/mobxInjector'

import Button from '@material-ui/core/Button';
import Construction from '../Common/Construction';

import { SoloConstructionModule } from '../../modules/SoloConstructionModule';
import { Construction as ConstructionModel} from '../../modules/Construction'

interface ConstructionsProps extends DefaultProps {
    constructions: SoloConstructionModule
}
interface ConstructionsState {
}

@inject(injector)
@observer
class Constructions extends React.Component <ConstructionsProps, ConstructionsState> {

    constructor(props: ConstructionsProps){
        super(props)
        this.state = {}
    }

    handleConstructionSelection = (c: ConstructionModel) => {
        this.props.ui.solo.switchConstruction(c)
    }

    renderCards(){
        return this.props.constructions.actualCards.map( (c, k) => 
            <Construction key={k} 
                card={c}
                onClick={() => this.handleConstructionSelection(c)}
            /> 
        )
    }

    render() {
        const manager = this.props.manager

        return (
            <div className="constructions-zone">
                {this.renderCards()}
            </div>
        );
    }
}

export default Constructions;