import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../../lib/mobxInjector'

import Constructions from './Constructions';
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
        let manager = this.props.solo.manager
        
        return (
            <div className="manager">
                <Constructions constructions={manager.constructions} />
                <Plans plans={manager.plans} />
            </div>
        );
    }
}

export default Manager;
