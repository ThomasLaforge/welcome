import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../../../lib/mobxInjector'

import Button from '@material-ui/core/Button';

import { Construction as ConstructionModel} from '../../../modules/Construction'
import Construction from '../../Common/Construction';

interface TempAgencyZoneProps extends DefaultProps {
}
interface TempAgencyZoneState {
}

@inject(injector)
@observer
class TempAgencyZone extends React.Component <TempAgencyZoneProps, TempAgencyZoneState> {

    constructor(props: TempAgencyZoneProps){
        super(props)
        this.state = {
        }
    }

    render() {
        let uiSolo = this.props.ui.solo
        return (
            <div className="temp-agency-zone">
                <Button onClick={() => uiSolo.handleDecrementConstruction()} disabled={!uiSolo.canDecrementConstruction}>-1</Button>
                <Construction card={uiSolo.actualConstructionToBuild}/>
                <Button onClick={() => uiSolo.handleIncrementConstruction()} disabled={!uiSolo.canIncrementConstruction}>+1</Button>
            </div>
        );
    }
}

export default TempAgencyZone;