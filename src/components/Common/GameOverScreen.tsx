import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../../lib/mobxInjector'

import { Button } from '../../../node_modules/@material-ui/core';
import { RouteEnum } from '../../modules/Welcome';
import { SoloGame } from '../../modules/SoloGame';

interface GameOverScreenProps extends DefaultProps {
    soloGame: SoloGame
}
interface GameOverScreenState {
}

@inject(injector)
@observer
class GameOverScreen extends React.Component <GameOverScreenProps, GameOverScreenState> {

    constructor(props: GameOverScreenProps){
        super(props)
        this.state = {
        }
    }
    
    render(){
        return <div className='game-over'>
            <div className="game-over-title">
                GAME OVER !
            </div>
            <div className="game-over-content">
                You scored {this.props.soloGame.totalScore}!
            </div>
            <div className="game-over-actions">
                <Button variant='outlined' onClick={() => { this.props.soloGame.reset() }}>Retry</Button>
                <Button variant='outlined' onClick={() => { this.props.ui.router.switchRoute(RouteEnum.Manager)} }>Back Home</Button>
            </div>
        </div>
    }
}

export default GameOverScreen;
