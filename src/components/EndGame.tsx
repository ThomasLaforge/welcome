import * as React from 'react';
import { DefaultProps, injector } from '../lib/mobxInjector'
import {observer, inject} from 'mobx-react';

import {HistoryLine, History} from '../modules/History'
import {Game} from '../modules/WelcomeModulesManager'

import LeaderBoard from './LeaderBoard'
import ScoreBoard from './ScoreBoard'

import Button from 'material-ui/Button';

interface EndGameProps extends DefaultProps {
}

interface EndGameState {
    history: History
}

@inject(injector)
@observer
export default class EndGame extends React.Component<EndGameProps, EndGameState> {
    constructor(props: EndGameProps) {
        super(props);
        this.state = {
            history: new History()
        };
    }

    componentWillMount(){
        console.log('endGame loading...')
        const g = this.props.game
        this.state.history.add({
            total: g.score,
            developements: g.getDevelopmentsScore(),
            monuments: g.getMonumentsScore(), 
            bonus: g.getBonusScore(),
            disasters: g.disasterCounter, 
            date: Date.now()
        })
    }

    reset = () => {
        this.props.store.reset()
    }

    render() {
        return <div className='end-game'>
            <div className='end-game-info'>
                <h1 className='end-game-title'>The game is finished!</h1>

                <div className='end-game-score-board'>
                    <h2 className='end-game-score-board-tilte'>Your score</h2>
                    <ScoreBoard />
                </div>
                
                <div className='end-game-history-actions'>
                    <Button variant="raised" color="secondary" onClick={this.reset}>Start new game</Button>
                </div>
            </div>


            <div className='end-game-leader-board'>
                <h2 className='end-game-leader-board-title'>Leader board</h2>
                <LeaderBoard history={this.state.history} />
            </div>
        </div>

    }
}
