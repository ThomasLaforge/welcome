import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../lib/mobxInjector'

import ConstructionEffect from './ConstructionEffect'

import {Construction} from '../modules/Construction'

interface CurrentConstructionProps extends DefaultProps {
    card: Construction
}
interface CurrentConstructionState {
}

@inject(injector)
@observer
class CurrentConstruction extends React.Component <CurrentConstructionProps, CurrentConstructionState> {

    constructor(props: CurrentConstructionProps){
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className="current-construction">
                <div className='house-number'>{this.props.card.houseNumber}</div>
                <div className='effect'>
                    <ConstructionEffect effect={this.props.card.effect} />
                </div>
            </div>
        );
    }
}

export default CurrentConstruction;
