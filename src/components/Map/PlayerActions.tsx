import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../../lib/mobxInjector'

import WelcomeMap from '../Common/WelcomeMap'
import GameOverScreen from '../Common/GameOverScreen';

import {MapMode} from '../../modules/Welcome'

interface PlayerActionsProps extends DefaultProps {
}
interface PlayerActionsState {
}

@inject(injector)
@observer
class PlayerActions extends React.Component <PlayerActionsProps, PlayerActionsState> {

    constructor(props: PlayerActionsProps){
        super(props)
        this.state = {
        }
    }

    render() {
        return <div className='map-solo-actions'>
            
        </div>
    }
}

export default PlayerActions;
