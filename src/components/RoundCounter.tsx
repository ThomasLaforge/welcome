import * as React from 'react';
import { DefaultProps, injector } from '../lib/mobxInjector'
import {observer, inject} from 'mobx-react';

import {NB_ROUND_TO_PLAY} from '../modules/RollTTAges'

interface RoundCounterProps extends DefaultProps {
}

interface RoundCounterState {
}

@inject(injector)
@observer
export default class RoundCounter extends React.Component<RoundCounterProps, RoundCounterState> {
    constructor(props: RoundCounterProps) {
        super(props);
        this.state = {
        };
    }

    render() {
        return <div className='round-counter'>
            Round: {this.props.game.round} / {NB_ROUND_TO_PLAY}
        </div>
    }
}