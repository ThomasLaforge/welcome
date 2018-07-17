import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../../lib/mobxInjector'

import CurrentConstruction from './CurrentConstruction'
import LastConstruction from './LastConstruction'

import {ConstructionPile} from '../../modules/ConstructionPile'

interface PileProps extends DefaultProps {
    p: ConstructionPile
}
interface PileState {
}

@inject(injector)
@observer
class Pile extends React.Component <PileProps, PileState> {

    constructor(props: PileProps){
        super(props)
        this.state = {}
    }

    render() {
        let pile = this.props.p

        return (
            <div className="pile">
                <CurrentConstruction card={pile.topCard} />
                <LastConstruction card={pile.lastCard} />
            </div>
        );
    }
}

export default Pile;