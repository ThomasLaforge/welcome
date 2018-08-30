import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../../lib/mobxInjector'

import { Button } from '../../../node_modules/@material-ui/core';
import Construction from '../Common/Construction';
import Plan from '../Common/Plan';

import { Construction as ConstructionModel } from '../../modules/Construction'
import { Effect } from '../../modules/Effect';
import { EffectType, PlanLevel, MAX_NB_ROUNDABOUT_TO_BUILD, GameMode } from '../../modules/Welcome';
import { Plan as PlanModel} from '../../modules/Plan';

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
        const uiMap = this.props.ui.map
        const f = uiMap.selectedField
        const fStreet = uiMap.map.streets[f.streetLine]
        const numbers = new Array(19).fill('').map( (val, i) => i - 1)

        return numbers.map( (n) => {
            const disabled = !uiMap.solo.fieldCanBeSelected(f, new ConstructionModel(n, null))
            return <div className={'numbers-elt ' + (disabled ? ' disabled' : '')}
                key={n}
                onClick={() => !disabled && this.props.ui.map.handleNumberClick(n)}
            > 
                {n}
            </div>
        })
    }

    handlePlanNumberClick = (number: number) => {
        console.log('on plan number click', number)
        const uiMap = this.props.ui.map

        uiMap.solo.player.completePlan( new PlanModel(
            {
                firstPlayer: number,
                others: number
            },
            null,
            uiMap.selectedPlanIndex,
            true
        ))
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

    renderEstateBtns(){
        const numbers = new Array(6).fill('').map( (val, i) => i + 1)
        return numbers.map( (n) => 
            <div className='estates-elt'
                key={n}
                onClick={() => this.props.ui.map.handleEstateClick(n)}
            > 
                {n}
            </div>
        )
    }

    renderEstateZone(){
        return <div className='map-estate-zone'>
            <div className='map-estate-zone-title'>Estates:</div>
            <div className='map-estate-zone-btns'>
                {this.renderEstateBtns()}
            </div>
        </div>
    }

    render() {
        const uiMap = this.props.ui.map
        const solo = uiMap.solo
        const f = uiMap.selectedField
        const fStreet = f && solo.map.streets[f.streetLine]

        let constructionBuiltFromSelectedField;
        if(uiMap.selectedField){
            let effectOfSelectedField = uiMap.selectedField.effect
            if(!effectOfSelectedField && uiMap.selectedField.isBis()){
                effectOfSelectedField = new Effect(EffectType.Bis)
            }
            if(uiMap.selectedField.houseNumber){
                constructionBuiltFromSelectedField = new ConstructionModel(uiMap.selectedField.houseNumber, effectOfSelectedField)
            }
        }

        const canBuildRoundabout = uiMap.solo.nbRoundaboutUsed < MAX_NB_ROUNDABOUT_TO_BUILD
        const fieldPosition = f && f.position 
        const canBuildLeftFence = uiMap.selectedField && fieldPosition > 0
        const canBuildRightFence = uiMap.selectedField && fieldPosition < fStreet.length - 1
        const canBis = solo.isPossibleBis(f)

        return <div className='map-actions'>
            <div className='map-specific-actions'>
                {!uiMap.inFieldSelectionMode() && !uiMap.inPlanSelectionMode() && 
                    <div className='map-actions-nothing-selected'>
                        Rien n'est encore sélectionné. Vous pouvez sélectionner un terrain ou un plan.
                    </div>
                }

                { uiMap.inFieldSelectionMode() && <div className="map-actions-field">
                    <div className='map-actions-info'>
                        {!!constructionBuiltFromSelectedField ? 
                            <Construction card={constructionBuiltFromSelectedField} />
                            :
                            <div className='map-actions-info-nothing-built'>
                                Rien de construit pour l'instant    
                            </div>
                        }
                    </div>

                    <div className='numbers'>
                        {this.renderNumbers()}
                    </div>
                    
                    <div className="map-actions-field-effects">
                        {/* <div className={"park-btn map-actions-btn" + (uiMap.selectedFieldIsPark ? ' disabled' : '')} */}
                        <div className="park-btn map-actions-btn"
                            onClick={uiMap.onParkClick}
                        >
                            Park
                        </div>
                        <div className="pool-btn map-actions-btn"
                            onClick={uiMap.onPoolClick}
                        >
                            Pool
                        </div>
                        <div className="interim-btn map-actions-btn"
                            onClick={uiMap.onInterimClick}
                        >
                            Interim
                        </div>
                        { uiMap.solo.mode === GameMode.Advanced &&
                            <div className={'roundabout-btn map-actions-btn' + (!canBuildRoundabout ? ' disabled' : '')}
                                onClick={canBuildRoundabout && uiMap.onRoundaboutClick}
                            >
                                Roundabout
                            </div>
                        }
                        <div className={'left-fence-btn map-actions-btn'}
                            onClick={uiMap.onLeftFenceClick}
                        >
                            Left Fence
                        </div>
                        <div className={'right-fence-btn map-actions-btn'}
                            onClick={uiMap.onRightFenceClick}
                        >
                            Right Fence
                        </div>
                        <div className={'bis-btn map-actions-btn ' + (!canBis ? 'disabled' : '')}
                            onClick={canBis && uiMap.onBisClick}
                        >
                            Bis
                        </div>
                    </div>
                    
                    <div className="actions">
                        {/* <Button onClick={uiMap.handleApply}>Apply</Button> */}
                        <Button variant='raised' onClick={uiMap.handleResetField}>Reset field</Button>
                    </div>
                </div>
                }
                { uiMap.inPlanSelectionMode() &&
                    <div className="map-actions-plans">
                        <div className='map-actions-plans-info'>
                            Vous avez sélectionné le plan n°{uiMap.selectedPlanIndex + 1}. Indiquez le nombre de point marqué pour ce plan.
                        </div>
                        {this.renderPlanNumbers()}
                    </div>
                }
            </div>
            <div className="map-global-actions">
                <Plan plan={uiMap.planToTest} />
                {uiMap.solo.planIsBuildable(uiMap.planToTest) ? 'buildable' : 'not buildable'}
                {this.renderEstateZone()}
                <Button className='rejection-btn' variant='raised' onClick={() => uiMap.handleRejection()}>Rejection</Button>
                {/* <Button variant='raised' onClick={this.handleCancel}>Cancel</Button> */}
            </div>
            {/* <Button onClick={uiMap.debug}>Debug</Button> */}
            {<Button onClick={() => uiMap.solo.completePlan(uiMap.planToTest)}>Build</Button>}
        </div>
    }
}

export default PlayerActions;
