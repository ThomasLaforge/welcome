import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../lib/mobxInjector'

import Button from 'material-ui/Button';

import Pile from './Pile'

interface ConstructionsProps extends DefaultProps {
}
interface ConstructionsState {
}

@inject(injector)
@observer
class Constructions extends React.Component <ConstructionsProps, ConstructionsState> {

    constructor(props: ConstructionsProps){
        super(props)
        this.state = {}
    }

    handleNext = () => {
        this.props.manager.constructions.nextTurn()
    }

    renderPiles(){
        return this.props.manager.constructions.piles.map( (p, k) => <Pile p={p} key={k} />)
    }

    render() {
        return (
            <div className="construction-deck">
                {this.renderPiles()}
                <Button onClick={this.handleNext}>
                    Next
                </Button>
            </div>
        );
    }
}

export default Constructions;
