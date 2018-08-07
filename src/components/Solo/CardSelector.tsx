import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../../lib/mobxInjector'

import {Construction as ConstructionCard} from '../../modules/Construction'
import Construction from '../Common/Construction'

interface CardSelectorProps extends DefaultProps {
    drawedCards: ConstructionCard[]
}
interface CardSelectorState {
}

@inject(injector)
@observer
class CardSelector extends React.Component <CardSelectorProps, CardSelectorState> {

    constructor(props: CardSelectorProps){
        super(props)
        this.state = {
        }
    }

    handleClickOnPossibleCard = (index) => {
        this.props.ui.solo.handleClickOnPossibleCard(index)
    }

    renderPossibleCards(){
        return this.props.solo.allCardsPossibleUniq.map( (c, k) => { 
            let bonusClasses = ''
            if(this.props.ui.solo.selectedCombinationIndex === k){
                bonusClasses += ' possible-card-selected'
            }
            if(this.props.solo.cardIsDisabled(c)){
                bonusClasses += ' possible-card-disabled'
            }
            return <div className={'possible-card' + bonusClasses} key={k}>
                <Construction card={c} onClick={() => this.handleClickOnPossibleCard(k)} />
            </div>
        })
    }

    render() {
        return <div className='card-selector'>
            {this.props.solo.possibleCards.length ?
                this.renderPossibleCards()
            :
                <div className='card-selector-skip-message'>
                    Any choice! Just skip this turn...
                </div>
            }
        </div>
    }
}

export default CardSelector;
