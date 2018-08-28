import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../../lib/mobxInjector'

import WelcomeMap from '../Common/WelcomeMap'
import GameOverScreen from '../Common/GameOverScreen';

import {MapMode} from '../../modules/Welcome'
import ScoreBoard from '../Common/ScoreBoard';
import PlayerActions from './PlayerActions';

interface MapModuleProps extends DefaultProps {
}
interface MapModuleState {
}

@inject(injector)
@observer
class MapModule extends React.Component <MapModuleProps, MapModuleState> {

    constructor(props: MapModuleProps){
        super(props)
        this.state = {
        }
    }

    render() {
        return <div className='game'>
            <div className="game-main">
                {this.props.solo.isGameOver() ? 
                    <GameOverScreen />
                :
                    <PlayerActions />
                }
            </div>
            <div className="game-paper">
               <WelcomeMap
                    mode={MapMode.Solo}
                    onHouseClick={this.props.ui.solo.handleHouseClick}
                    onParkClick={this.props.ui.solo.handleParkClick}
                    onStreetClick={this.props.ui.solo.handleStreetClick}
                    onFenceClick={this.props.ui.solo.handleFenceClick}
                    soloGame={this.props.ui.solo}
                />
                <ScoreBoard 
                    soloGame={this.props.solo}
                />
            </div>
        </div>
    }
}

export default MapModule;
