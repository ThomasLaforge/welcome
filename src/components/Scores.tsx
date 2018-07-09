import * as React from 'react';
import { DefaultProps, injector } from '../lib/mobxInjector'
import {observer, inject} from 'mobx-react';

interface ScoresProps extends DefaultProps {
}

interface ScoresState {
}

@inject(injector)
@observer
export default class Scores extends React.Component<ScoresProps, ScoresState> {
    constructor(props: ScoresProps) {
        super(props);
        this.state = {
        };
    }

    render() {
        return <div className='score'>
            Score : {this.props.game.score}
        </div>
    }
}