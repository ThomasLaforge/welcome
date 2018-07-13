import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../lib/mobxInjector'

// import {WelcomeMap as WelcomeMapModel} from '../modules/WelcomeMap'

import { MissionType } from '../modules/Welcome';

interface WelcomeMapProps extends DefaultProps {
}
interface WelcomeMapState {
}

@inject(injector)
@observer
class WelcomeMap extends React.Component <WelcomeMapProps, WelcomeMapState> {

    constructor(props: WelcomeMapProps){
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className="map">
                <div className="test-on-map">
                </div>
            </div>
        );
    }
}

export default WelcomeMap;
