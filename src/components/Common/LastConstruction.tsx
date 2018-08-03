import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../../lib/mobxInjector'

import ConstructionEffect from './ConstructionEffect'

import {Construction} from '../../modules/Construction'

interface LastConstructionProps extends DefaultProps {
    card: Construction
}
interface LastConstructionState {
}

@inject(injector)
@observer
class LastConstruction extends React.Component <LastConstructionProps, LastConstructionState> {

    constructor(props: LastConstructionProps){
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className="last-construction">
                <ConstructionEffect effect={this.props.card.effectType} />
            </div>
        );
    }
}

export default LastConstruction;
