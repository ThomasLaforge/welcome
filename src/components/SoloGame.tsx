import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../lib/mobxInjector'

import Manager from './Manager'
import WelcomeMap from './WelcomeMap'
import PlayerActions from './PlayerActions'
import ScoreBoard from './ScoreBoard'

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
            <div className="game-infos">
                <Manager />
                <WelcomeMap />
                <ScoreBoard />
            </div>
            <div className="game-main">
                <PlayerActions />
            </div>
        </div>
    }
}

export default SoloGame;
