import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../../lib/mobxInjector'

import Manager from './Manager'
import WelcomeMap from '../Common/WelcomeMap'
import ScoreBoard from '../Common/ScoreBoard'
import PlayerActions from './PlayerActions'
import { MapMode } from '../../modules/Welcome';
import GameOverScreen from '../Common/GameOverScreen';

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
                {this.props.solo.isGameOver() ? 
                    <GameOverScreen />
                : <>
                    <Manager />
                    <PlayerActions />
                </>
                }
            </div>
            <div className="game-paper">
               <WelcomeMap
                    mode={MapMode.Solo}
                    onHouseClick={this.props.ui.solo.handleHouseClick}
                    onParkClick={this.props.ui.solo.handleParkClick}
                    onStreetClick={this.props.ui.solo.handleStreetClick}
                    onFenceClick={this.props.ui.solo.handleFenceClick}
                />
                <ScoreBoard />
            </div>
        </div>
    }
}

export default SoloGame;
