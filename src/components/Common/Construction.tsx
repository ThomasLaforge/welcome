import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../../lib/mobxInjector'

import {Construction as ConstructionModel} from '../../modules/Construction'
import ConstructionEffect from './ConstructionEffect';

interface ConstructionProps extends DefaultProps {
    card: ConstructionModel
}
interface ConstructionState {
}

@inject(injector)
@observer
class Construction extends React.Component <ConstructionProps, ConstructionState> {

    constructor(props: ConstructionProps){
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className="construction">
                <div className='construction-number'>{this.props.card.houseNumber}</div>
                <ConstructionEffect effect={this.props.card.effect} />
            </div>
        );
    }
}

export default Construction;
