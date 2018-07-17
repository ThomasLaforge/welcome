import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../../lib/mobxInjector'

import Button from '@material-ui/core/Button';

import { SoloConstructionModule } from '../../modules/SoloConstructionModule';
import Construction from '../Common/Construction';

interface ConstructionsProps extends DefaultProps {
    constructions: SoloConstructionModule
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

    renderCards(){
        return this.props.constructions.actualCards.map( (c, k) => <Construction card={c} key={k} /> )
    }

    render() {
        const manager = this.props.manager

        return (
            <div className="constructions-zone">
                <div className="solo-construction-cards">
                    {this.renderCards()}
                </div>
            </div>
        );
    }
}

export default Constructions;
