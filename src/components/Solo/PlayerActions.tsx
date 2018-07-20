import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../../lib/mobxInjector'

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Construction from '../Common/Construction';
// import Paper from '@material-ui/core/Paper';

// import ConstructionSelected from './ConstructionSelected';
import {Construction as ConstructionModel} from '../../modules/Construction' 
import { SoloPhase } from '../../modules/Welcome';

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

    handleBack = () => {
        console.log('handle back')
        this.props.ui.solo.back()
    }
    handleNext = () => {
        console.log('handle next')
        this.props.ui.solo.next()
    }

    unselectConstruction = (construction: ConstructionModel) => {
        this.props.ui.solo.unselectConstruction(construction)
    }

    renderStepperContent(){
        console.log('render stepper content', this.props.ui.solo.activePlayerActionStep)
        return <div className='player-actions-stepper-content'>
        </div>
    }

    render() {
        const steps = [
            'Chose a construction',
            'Chose house to build it',
            'Effect',
            'Confirmation'
        ]

        const uiSolo = this.props.ui.solo
        // console.log('activePlayerActionStep', this.props.ui, this.props.ui.solo)

        return <div className='player-actions'>
            <div className='player-actions-info'>
                <div className='player-actions-stepper'>
                <Stepper activeStep={uiSolo.activePlayerActionStep || 0} alternativeLabel>
                    {steps.map(label => {
                        return (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                        );
                    })}
                </Stepper>
                </div>
                {/* player-actions-stepper-content */}
                {this.renderStepperContent()}
            </div>
            <div className='player-actions-content'>
                {uiSolo.isInPhase(SoloPhase.ConstructionSelection) &&
                    <React.Fragment>
                        <div className="selected-construction">
                            {uiSolo.selectedConstructionIndexes.map(indexC => {
                                let construction = this.props.solo.manager.constructions.actualCards[indexC]
                                return <Construction key={indexC}
                                    onClick={() => this.unselectConstruction(construction)}
                                    card={construction} 
                                />
                            })}
                        </div>
                        <Button disabled={uiSolo.selectedConstructionIndexes.length < 2} onClick={() => uiSolo.switchSelectedConstructions()}>
                            Switch
                        </Button>
                    </React.Fragment>
                }
                {uiSolo.isInPhase(SoloPhase.HouseSelection) &&
                    <React.Fragment>
                        <div className="merged-construction">
                            <Construction card={uiSolo.computedConstruction}/>
                        </div>
                    </React.Fragment>
                }
            </div>
            <div className='player-actions-play-btn'>
                <Button 
                    variant='raised'
                    disabled={uiSolo.activePlayerActionStep === SoloPhase.ConstructionSelection}
                    onClick={this.handleBack}
                >
                    Back
                </Button>
                <Button 
                    variant='raised'
                    onClick={this.handleNext}
                    disabled={!uiSolo.canGoNext()}
                >
                    {uiSolo.activePlayerActionStep === SoloPhase.Confirmation ? 'Play' : 'Next'}
                </Button>
            </div>   
        </div>
    }
}

export default PlayerActions;