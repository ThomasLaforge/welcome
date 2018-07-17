import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../../lib/mobxInjector'

import {WelcomeModulesManager} from '../../modules/WelcomeModulesManager'
import ConstructionDeck from '../Common/ConstructionDeck';
import Constructions from '../Common/Constructions';
import Plans from '../Common/Plans';

interface TurnCounterProps extends DefaultProps {
}
interface TurnCounterState {
}

@inject(injector)
@observer
class TurnCounter extends React.Component <TurnCounterProps, TurnCounterState> {

    constructor(props: TurnCounterProps){
        super(props)
        this.state = {}
    }

    render() {
        let manager = this.props.manager
        
        return ( 
            <div className="turn">
                {manager.turn} / {manager.nbTurn}
            </div>
        );
    }
}

export default TurnCounter;