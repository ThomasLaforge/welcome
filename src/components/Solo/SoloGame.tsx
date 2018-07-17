import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../../lib/mobxInjector'

import Manager from './Manager'
import WelcomeMap from '../Common/WelcomeMap'
import ScoreBoard from '../Common/ScoreBoard'
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
            <div className="game-main">
                <Manager />
                <PlayerActions />
            </div>
            <div className="game-paper">
                <WelcomeMap />
                <ScoreBoard />
            </div>
        </div>
    }
}

export default SoloGame;
