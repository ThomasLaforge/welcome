import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../../lib/mobxInjector'

interface ScoreBoardProps extends DefaultProps {
}
interface ScoreBoardState {
}

@inject(injector)
@observer
class ScoreBoard extends React.Component <ScoreBoardProps, ScoreBoardState> {

    constructor(props: ScoreBoardProps){
        super(props)
        this.state = {
        }
    }

    renderSpots(){
        return []
    }

    render() {
        return <div className='score-board'>
            {this.renderSpots()}
        </div>
    }
}

export default ScoreBoard;
