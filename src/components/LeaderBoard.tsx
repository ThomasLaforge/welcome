import * as React from 'react';
import { DefaultProps, injector } from '../lib/mobxInjector'
import {observer, inject} from 'mobx-react';

import {HistoryLine, History} from '../modules/History'

import Button from 'material-ui/Button';

interface LeaderBoardProps extends DefaultProps {
    history: History
}

interface LeaderBoardState {
}

@inject(injector)
@observer
export default class LeaderBoard extends React.Component<LeaderBoardProps, LeaderBoardState> {
    constructor(props: LeaderBoardProps) {
        super(props);
        this.state = {
        };
    }

    renderHistoryLines(){        
        console.log('history lines', this.props.history.lines.reduce( (s, o) => o + ' ,', ''))
        return this.props.history.getFiveBests().map( (l: HistoryLine, i) => 
            <tr key={i}>
                <td>{l.total}</td>
                <td>{l.developements}</td>
                <td>{l.monuments}</td>
                <td>{l.bonus}</td>
                <td>{l.disasters}</td>
                <td>{l.date}</td>
            </tr>
        )
    }

    render() {
        return <div className='leader-board'>
            { this.props.history.getFiveBests().length > 0 ?
                <table className='leader-board-table'>
                    <thead>
                        <tr>
                            <th>Score total</th>
                            <th>Developements</th>
                            <th>Monuments</th>
                            <th>Bonus</th>
                            <th>Disasters</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderHistoryLines()}
                    </tbody>
                </table>
            : 
                <div className='leader-board-empty'>
                    Pas de données d'historique
                </div>
            }
        </div>
    }
}
