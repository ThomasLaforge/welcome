import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../lib/mobxInjector'

import {WelcomeModulesManager} from '../modules/WelcomeModulesManager'
import ConstructionDeck from './ConstructionDeck';
import Constructions from './Constructions';

// import Stepper, { Step, StepLabel } from 'material-ui/Stepper';
// import Button from 'material-ui/Button';
// import Paper from 'material-ui/Paper';


interface ManagerProps extends DefaultProps {
}
interface ManagerState {
}

@inject(injector)
@observer
class Manager extends React.Component <ManagerProps, ManagerState> {

    constructor(props: ManagerProps){
        super(props)
        this.state = {}
    }

    render() {
        let manager = this.props.manager
        
        return (
            <div className="manager">
                {/* <ConstructionDeck /> */}
                <div className="turn">
                    {manager.turn} / {manager.nbTurn}
                </div>
                <Constructions />
            </div>
        );
    }
}

export default Manager;
