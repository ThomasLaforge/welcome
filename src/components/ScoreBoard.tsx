import * as React from 'react';
import { DefaultProps, injector } from '../lib/mobxInjector'
import {observer, inject} from 'mobx-react';

import Button from 'material-ui/Button';

interface ScoreBoardProps extends DefaultProps {
}

interface ScoreBoardState {
}

@inject(injector)
@observer
export default class ScoreBoard extends React.Component<ScoreBoardProps, ScoreBoardState> {
    constructor(props: ScoreBoardProps) {
        super(props);
        this.state = {
        };
    }

    render() {
        return <div className='score-board'>
            <div className='score-board-description'></div>
            <div className='score-board-content'>
                <div className='score-board-elt score-board-developements'>
                    <div className='score-board-elt-title'>Developements</div>
                    <div className='score-board-elt-value'>{this.props.game.getDevelopmentsScore()}</div>                        
                </div>
                <div className='score-board-separator'>+</div>
                <div className='score-board-elt score-board-monuments'>
                    <div className='score-board-elt-title'>Monuments</div>
                    <div className='score-board-elt-value'>{this.props.game.getMonumentsScore()}</div>                        
                </div>
                <div className='score-board-separator'>+</div>                
                <div className='score-board-elt score-board-bonus'>
                    <div className='score-board-elt-title'>Bonus</div>
                    <div className='score-board-elt-value'>{this.props.game.getBonusScore()}</div>                                            
                </div>
                <div className='score-board-separator'>-</div>                
                <div className='score-board-elt score-board-disasters'>
                    <div className='score-board-elt-title'>Disasters</div>
                    <div className='score-board-elt-value'>{this.props.game.disasterCounter}</div>                                            
                </div>
                <div className='score-board-separator'>=</div>                
                <div className='score-board-elt score-board-total'>
                    <div className='score-board-elt-title'>Total</div>
                    <div className='score-board-elt-value'>{this.props.game.score}</div>                                            
                </div>
            </div>
        </div>
    }
}
