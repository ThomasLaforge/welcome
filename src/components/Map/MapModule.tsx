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
        let uiMap = this.props.ui.map
        let solo = uiMap.solo
        return <div className='map-module'>
            <div className="map-module-paper">
                <WelcomeMap
                    mode={MapMode.MapOnly}
                    onHouseClick={uiMap.handleFieldClick}
                    map={solo.map}
                />
                <ScoreBoard 
                    soloGame={solo}
                    handlePlanClick={uiMap.handlePlanClick}
                />
            </div>
            <div className="map-module-main">
                {solo.isGameOver() ? 
                    <GameOverScreen soloGame={solo} />
                :
                    <PlayerActions />
                }
            </div>
        </div>
    }
}

export default MapModule;
