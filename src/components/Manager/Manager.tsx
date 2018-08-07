import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../../lib/mobxInjector'

import {WelcomeModulesManager} from '../../modules/WelcomeModulesManager'
import ConstructionDeck from '../Common/ConstructionDeck';
import Constructions from '../Common/Constructions';
import Plans from '../Common/Plans';

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
                <Constructions constructions={manager.constructions} />
                <hr />           
                <Plans plans={manager.plans} />
            </div>
        );
    }
}

export default Manager;
