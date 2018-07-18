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

    handlePlay = () => {
        console.log('handle play')
    }

    renderStepperContent(){
        console.log('render stepper content', this.props.ui.activePlayerActionStep)
        return <div className='player-actions-stepper-content'>
        </div>
    }

    render() {
        const steps = [
            'Chose a construction',
            'Chose house to build it',
            'Effect'
        ]

        return <div className='player-actions'>
            <div className='player-actions-info'>
                <div className='player-actions-stepper'>
                <Stepper activeStep={this.props.ui.activePlayerActionStep} alternativeLabel>
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
                {this.props.ui.selectedConstructions &&
                    // <ConstructionSelected />
                    <div className="selected-construction">
                        {this.props.ui.selectedConstructions.map(indexC => {
                            let construction = this.props.solo.manager.constructions.actualCards[indexC]
                            return <Construction key={indexC}
                                card={construction} 
                            />
                        })}
                    </div>
                }
            </div>
            <div className='player-actions-play-btn'>
                <Button 
                    variant='raised'
                    onClick={this.handlePlay}
                >
                    Play
                </Button>
            </div>   
        </div>
    }
}

export default PlayerActions;