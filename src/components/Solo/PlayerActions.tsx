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
import EstateZone from './EffectZones/EstateZone'
import BisZone from './EffectZones/BisZone'
import TempAgencyZone from './EffectZones/TempAgencyZone'

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
    handleSkip = () => {
        console.log('handle skip')
        this.props.ui.solo.skip()
    }

    handleClickOnEstateChoice = (choice: number) => {
        console.log('estate choice', choice)
        this.props.ui.solo.handleEstateChoice(choice)
    }

    render() {
        const uiSolo = this.props.ui.solo
        const showSkipBtn = false
        console.log('effect type', uiSolo.computedConstruction && uiSolo.computedConstruction.effect, EffectType.TempAgency )

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
                        { uiSolo.computedConstruction.effectType === EffectType.TempAgency ?
                            <TempAgencyZone />
                        :
                            <Construction card={uiSolo.computedConstruction} />
                        }
                    </div>
                }
                {uiSolo.isInPhase(SoloPhase.EffectChoices) &&
                    <div className="effect-zone">
                        <ConstructionEffect effect={uiSolo.computedConstruction.effectType} />
                        { uiSolo.computedConstruction.effectType === EffectType.RealEstateAgent && <EstateZone estateChoiceSelection={uiSolo.handleEstateChoice} /> }
                        { uiSolo.computedConstruction.effectType === EffectType.Bis && <BisZone /> }
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
                    {showSkipBtn && <Button 
                        variant='raised'
                        disabled={false}
                        onClick={this.handleSkip}
                    >
                        Skip
                    </Button>
                }
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