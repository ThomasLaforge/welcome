import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../../lib/mobxInjector'

import Button from '@material-ui/core/Button';

import Pile from './Pile'

interface GameOverProps extends DefaultProps {
}
interface GameOverState {
}

@inject(injector)
@observer
class GameOver extends React.Component <GameOverProps, GameOverState> {

    constructor(props: GameOverProps){
        super(props)
        this.state = {}
    }
    render() {
        return (
            <div className="game-over">
                GameOver
            </div>
        );
    }
}

export default GameOver;
