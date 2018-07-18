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

    handleConstructionSelection = (k: number) => {
        let constructionIndex = this.props.ui.selectedConstructions.indexOf(k)
        if(constructionIndex === -1){
            this.props.ui.selectedConstructions.push(k)
        }
        else {
            this.props.ui.selectedConstructions.splice(constructionIndex, 1)
        }
    }

    renderCards(){
        return this.props.constructions.actualCards.map( (c, k) => 
            <Construction key={k} 
                card={c}
                onClick={() => this.handleConstructionSelection(k)}
            /> 
        )
    }

    render() {
        const manager = this.props.manager

        return (
            <div className="constructions-zone">
                {this.renderCards()}
            </div>
        );
    }
}

export default Constructions;