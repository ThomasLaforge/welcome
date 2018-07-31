import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../../lib/mobxInjector'

import Button from '@material-ui/core/Button';
import Construction from '../Common/Construction';
import CardSelector from './CardSelector'
// import Paper from '@material-ui/core/Paper';

// import ConstructionSelected from './ConstructionSelected';
import {Construction as ConstructionModel} from '../../modules/Construction' 
import { SoloPhase, EffectType } from '../../modules/Welcome';

import ConstructionEffect from '../Common/ConstructionEffect';
import GameStepper from '../Common/GameStepper';
import Summary from './Summary';

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

    render() {
        const uiSolo = this.props.ui.solo

        return <div className='player-actions'>
            <div className='player-actions-info'>
                <GameStepper />
            </div>
            <div className='player-actions-content'>
                {uiSolo.isInPhase(SoloPhase.ConstructionSelection) &&
                    <CardSelector
                        drawedCards={this.props.solo.manager.constructions.actualCards}
                    />
                }
                {uiSolo.isInPhase(SoloPhase.HouseSelection) &&
                    <div className="merged-construction">
                        <Construction card={uiSolo.computedConstruction}/>
                    </div>
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
                {uiSolo.isInPhase(SoloPhase.Confirmation) && <Summary />}
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