import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../../lib/mobxInjector'

<<<<<<< HEAD
import { Button } from '../../../node_modules/@material-ui/core';
import Construction from '../Common/Construction';

import { Construction as ConstructionModel } from '../../modules/Construction'
import { Effect } from '../../modules/Effect';
import { EffectType } from '../../modules/Welcome';

=======
>>>>>>> 4e3be9da00ee3e1d19a8c27f75eeb53c8ff62fac
interface PlayerActionsProps extends DefaultProps {
}
interface PlayerActionsState {
}

@inject(injector)
@observer
class PlayerActions extends React.Component <PlayerActionsProps, PlayerActionsState> {

    constructor(props: PlayerActionsProps){
        super(props)
        this.state = {
        }
    }

    handleCancel = () => {
        console.log('ask cancel');
    }

    renderNumbers(){
        const numbers = new Array(19).fill('').map( (val, i) => i - 1)
        return numbers.map( (n) => 
            <div className='numbers-elt'
                key={n}
                onClick={() => this.props.ui.map.handleNumberClick(n)}
            > 
                {n}
            </div>
        )
    }

    handlePlanNumberClick = (number: number) => {
        console.log('on plan number click', number)
    }

    renderPlanNumbers(){
        const numbers = new Array(16).fill('').map( (val, i) => i)
        return numbers.map( (n) => 
            <div className='plan-numbers-elt'
                key={n}
                onClick={() => this.handlePlanNumberClick(n)}
            > 
                {n}
            </div>
        )
    }

    handleEstateClick = (number: number) => {
        console.log('on estate click', number)
    }

    renderEstateBtns(){
        const numbers = new Array(6).fill('').map( (val, i) => i + 1)
        return numbers.map( (n) => 
            <div className='estates-elt'
                key={n}
                onClick={() => this.handleEstateClick(n)}
            > 
                {n}
            </div>
        )
    }

    render() {
        let uiMap = this.props.ui.map

        let constructionBuiltFromSelectedField
        if(uiMap.selectedField){
            let effectOfSelectedField = uiMap.selectedField.effect
            if(!effectOfSelectedField && uiMap.selectedField.isBis()){
                effectOfSelectedField = new Effect(EffectType.Bis)
            }
            constructionBuiltFromSelectedField = new ConstructionModel(uiMap.selectedField.houseNumber, effectOfSelectedField)
        }

        return <div className='map-actions'>
            {uiMap.selectedField && 
                <div className='map-actions-info'>
                    <Construction card={constructionBuiltFromSelectedField} />
                </div>
            }

            { uiMap.inFieldSelectionMode() && <div className="map-actions-field">
                <div className={"park-btn" + (uiMap.selectedFieldIsPark ? ' disabled' : '')}
                    onClick={uiMap.onParkClick}
                >
                    Park
                </div>
                <div className="pool-btn"
                    onClick={uiMap.onPoolClick}
                >
                    Pool
                </div>
                <div className="interim-btn"
                    onClick={uiMap.onInterimClick}
                >
                    Interim
                </div>
                <div className='roundabout-btn'
                    onClick={uiMap.onRoundaboutClick}
                >
                    Roundabout
                </div>
                <div className='left-fence-btn'
                    onClick={uiMap.onLeftFenceClick}
                >
                    Left Fence
                </div>
                <div className='right-fence-btn'
                    onClick={uiMap.onRightFenceClick}
                >
                    Right Fence
                </div>
                <div className='bis-btn'
                    onClick={uiMap.onBisClick}
                >
                    Bis
                </div>
                <div className='numbers'>
                    {this.renderNumbers()}
                </div>
                <div className="actions">
                    {/* <Button onClick={uiMap.handleApply}>Apply</Button> */}
                    <Button onClick={uiMap.handleResetField}>Reset field</Button>
                </div>
            </div>
            }
            { uiMap.inPlanSelectionMode() && <div className="map-actions-plans">
                {this.renderPlanNumbers()}
            </div>
            }
            <div className="map-actions-global">
                <Button onClick={() => uiMap.handleRejection()}>Rejection</Button>
                <Button onClick={this.handleCancel}>Cancel</Button>
            </div>
            {/* <Button onClick={uiMap.debug}>Debug</Button>     */}
        </div>
    }
}

export default PlayerActions;
