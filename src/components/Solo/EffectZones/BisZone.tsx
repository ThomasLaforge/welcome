import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../../../lib/mobxInjector'

import Button from '@material-ui/core/Button';

import { Construction as ConstructionModel} from '../../../modules/Construction'

interface BisZoneProps extends DefaultProps {
}
interface BisZoneState {
}

@inject(injector)
@observer
class BisZone extends React.Component <BisZoneProps, BisZoneState> {

    constructor(props: BisZoneProps){
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className="bis-zone">
            </div>
        );
    }
}

export default BisZone;