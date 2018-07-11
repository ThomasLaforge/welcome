import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../lib/mobxInjector'

interface ConstructionDeckProps extends DefaultProps {
}
interface ConstructionDeckState {
}

@inject(injector)
@observer
class ConstructionDeck extends React.Component <ConstructionDeckProps, ConstructionDeckState> {

    constructor(props: ConstructionDeckProps){
        super(props)
        this.state = {}
    }

    renderConstructions(){
        return this.props.manager.constructions.constructionDeck.arrayDeck.map( (c, k) =>
            <span key={k}>
                {c.houseNumber} : {c.effect} ///
            </span>
        )
    }

    render() {
        let manager = this.props.manager

        return (
            <div className="construction-deck">
                {this.renderConstructions()}
            </div>
        );
    }
}

export default ConstructionDeck;
