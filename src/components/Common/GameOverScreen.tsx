import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../../lib/mobxInjector'

import { Button } from '../../../node_modules/@material-ui/core';
import { Route } from '../../modules/Welcome';

interface GameOverScreenProps extends DefaultProps {
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
                You scored {this.props.solo.totalScore}!
            </div>
            <div className="game-over-actions">
                <Button variant='outlined' onClick={() => { this.props.solo.reset() }}>Retry</Button>
                <Button variant='outlined' onClick={() => { this.props.ui.switchRoute()} }>Back Home</Button>
            </div>
        </div>
    }
}

export default GameOverScreen;
