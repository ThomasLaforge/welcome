import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../../lib/mobxInjector'

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import { GameMode, SoloPhase, EffectType } from '../../modules/Welcome';

interface GameStepperProps extends DefaultProps {
}
interface GameStepperState {
}

@inject(injector)
@observer
class GameStepper extends React.Component <GameStepperProps, GameStepperState> {

    constructor(props: GameStepperProps){
        super(props)
        this.state = {}
    }
    
    renderStepperContent(){
        // console.log('render stepper content', this.props.ui.solo.activePlayerActionStep)
        return <div className='player-actions-stepper-content'>
            {/* TempAgency */}
            {this.props.ui.solo.currentPhase === SoloPhase.HouseSelection && this.props.ui.solo.actualConstructionToBuild.effectType === EffectType.Interim &&
                `Le pouvoir de cette construction vous permet de modifier la valeur de votre construction de + ou - 2!`
            }
            {/* Pool */}
            {this.props.ui.solo.currentPhase === SoloPhase.HouseSelection && this.props.ui.solo.actualConstructionToBuild.effectType === EffectType.PoolManufacturer &&
                `Info: si vous choisissez un terrain avec une piscine, cette dernière sera construite!`
            }
            {/* Park */}
            {this.props.ui.solo.currentPhase === SoloPhase.HouseSelection && this.props.ui.solo.actualConstructionToBuild.effectType === EffectType.Landscaper &&
                `Info: lorsque votre maison sera construite, le parc de votre quartier sera agrandi!`
            }
            {/* Surveyor */}
            {this.props.ui.solo.currentPhase === SoloPhase.EffectChoices && this.props.ui.solo.actualConstructionToBuild.effectType === EffectType.Surveyor &&
                `Choissisez une bordure à construire!`
            }
        </div>
    }

    render() {
        let steps = [
            'Chose a construction',
            'Chose house to build it',
            'Effect',
            'RoundAbout',
            'Confirmation'
        ]
        if(this.props.solo.mode === GameMode.Normal){
            steps.splice(3, 1)
        }

        const uiSolo = this.props.ui.solo

        return <div className='player-actions-Gamestepper'>
            <Stepper activeStep={uiSolo.activePlayerActionStep || 0} alternativeLabel>
                {steps.map(label =>
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                )}
            </Stepper>
            {/* player-actions-Gamestepper-content */}
            {this.renderStepperContent()}
        </div>
    }
}

export default GameStepper;
