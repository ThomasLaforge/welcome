import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../lib/mobxInjector'

import Manager from './Manager'
import WelcomeMap from './WelcomeMap'
import PlayerActions from './PlayerActions'

interface SoloGameProps extends DefaultProps {
}
interface SoloGameState {
}

@inject(injector)
@observer
class SoloGame extends React.Component <SoloGameProps, SoloGameState> {

    constructor(props: SoloGameProps){
        super(props)
        this.state = {
        }
    }

    render() {
        return <div className='game'>
            <Manager />
            <WelcomeMap />
            <PlayerActions />
        </div>
    }
}

export default SoloGame;
