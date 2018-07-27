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
import { SoloPhase, GameMode, EffectType } from '../../modules/Welcome';
import ConstructionEffect from '../Common/ConstructionEffect';

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

    handleClickOnEstateChoice = (choice: number) => {
        console.log('estate choice', choice)
        this.props.ui.solo.handleEstateChoice(choice)
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
        // console.log('activePlayerActionStep', this.props.ui, this.props.ui.solo)
        console.log('current phase', uiSolo.currentPhase)

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
                {uiSolo.isInPhase(SoloPhase.EffectChoices) &&
                    <div className="effect-zone">
                        <ConstructionEffect effect={uiSolo.computedConstruction.effect} />
                        { uiSolo.computedConstruction.effect === EffectType.RealEstateAgent && 
                        <React.Fragment>
                            <div className='effect-zone-estate-text'></div>
                            <div className='effect-estate-choices'>
                                <div className='effect-estate-choices-1' onClick={() => this.handleClickOnEstateChoice(1)}>1</div>
                                <div className='effect-estate-choices-2' onClick={() => this.handleClickOnEstateChoice(2)}>2</div>
                                <div className='effect-estate-choices-3' onClick={() => this.handleClickOnEstateChoice(3)}>3</div>
                                <div className='effect-estate-choices-4' onClick={() => this.handleClickOnEstateChoice(4)}>4</div>
                                <div className='effect-estate-choices-5' onClick={() => this.handleClickOnEstateChoice(5)}>5</div>
                                <div className='effect-estate-choices-6' onClick={() => this.handleClickOnEstateChoice(6)}>6</div>
                            </div>
                        </React.Fragment>                        
                        }
                    </div>
                }
                {uiSolo.isInPhase(SoloPhase.Confirmation) &&
                    <div className='confirmation'>
                        <div className='confirmation-construction'>
                            <div className='confirmation-construction'>
                                Vous souhaitew construire cette construction:
                            </div>
                            <div className="merged-construction">
                                <Construction card={uiSolo.computedConstruction}/>
                            </div>                            
                        </div>
                        <div className='confirmation-where'>
                            <div className='confirmation-where-text'>
                                Au lieu indiqué par une bordure bleu 
                            </div>                            
                        </div>
                        <div className='confirmation-effect'>
                            <div className='confirmation-effect-text'>
                                Et appliquer cet effet:
                            </div>                            
                            <div className='confirmation-effect-type'>
                            </div>                            
                        </div>
                        {
                            uiSolo.game.isInAdvancedMode() && uiSolo.selectedRoundabout &&
                            <div className='confirmation-roundabout'>
                                <div className='confirmation-roundabout-text'>
                                    Et ajouter un rond point à l'endroit indiqué en orange:
                                </div>
                            </div>
                        }
                    </div>
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
                    {uiSolo.currentPhase === SoloPhase.Confirmation ? 'Play' : 'Next'}
                </Button>
            </div>   
        </div>
    }
}

export default PlayerActions;