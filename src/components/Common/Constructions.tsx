import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../../lib/mobxInjector'

import Button from '@material-ui/core/Button';

import Pile from './Pile'
import { ConstructionModule } from '../../modules/ConstructionModule';

interface ConstructionsProps extends DefaultProps {
    constructions: ConstructionModule
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

    handleNext = () => this.props.constructions.nextTurn()
    handleReshuffle = () => this.props.constructions.reshuffle()

    renderPiles(){
        return this.props.constructions.piles.map( (p, k) => <Pile p={p} key={k} />)
    }

    render() {
        const manager = this.props.manager

        return (
            <div className="constructions-zone">
                <div className="piles">
                    {this.renderPiles()}
                </div>

                <div className="constructions-actions">
                    <Button variant="outlined" color="primary" 
                        disabled={this.props.manager.turn === this.props.manager.nbTurn}
                        onClick={this.handleNext}
                    >
                        Next
                    </Button>
                    <Button variant="outlined" color="primary" 
                        onClick={this.handleReshuffle}
                    >
                        Reshuffle
                    </Button>
                </div>
            </div>
        );
    }
}

export default Constructions;
