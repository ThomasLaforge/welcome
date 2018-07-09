import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../lib/mobxInjector'

import {Game as GameModel} from '../modules/WelcomeModulesManager'
import {GamePhase, Stringifier} from '../modules/RollTTAges'

import DiceZone from './DiceZone'
import City from './City'
import Stocks from './Stocks'
import Developements from './Developements'
import Monuments from './Monuments'
import Scores from './Scores'
import HelpAndInfos from './HelpAndInfos'

import Stepper, { Step, StepLabel } from 'material-ui/Stepper';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';


interface GameProps extends DefaultProps {
}
interface GameState {
}

@inject(injector)
@observer
class Game extends React.Component <GameProps, GameState> {

    constructor(props: GameProps){
        super(props)
        this.state = {
        }
    }

    handleEndTurn = () => {
        if(this.props.game.stock.isLegalAtEndOfTurn()){
            this.props.game.step5()
        }
        else {
            throw "try to end turn but not working";
            
        }
    }

    render() {
        let game = this.props.game
        
        return (
            <div className="game">
                {/* <Button onClick={() => this.props.game.undo()}>Undo</Button> */}
                {/* <Button onClick={() => this.props.game.redo()}>Undo</Button> */}
                <div className='game-phase'>
                    <div className='game-phase-stepper'>
                        <Stepper activeStep={game.phase}>
                        {Object.keys(GamePhase).map(key => GamePhase[key]).filter(v => typeof v !== "string").map((index, i) =>
                            <Step key={index} title={game.phase !== i ? Stringifier.getGamePhaseDescription(index) : ''}>
                                <StepLabel>{Stringifier.getGamePhaseName(index)}</StepLabel>
                            </Step>
                        )}
                        </Stepper>
                    </div>
                    <div className='game-phase-current-desciption'>
                        {Stringifier.getGamePhaseDescription(game.phase)}
                    </div>
                    {/* <Button onClick={() => game.goToNextPhase()}>Increase Phase</Button> */}
                </div>
                <div className='game-main-zone'>
                    {game.phase === GamePhase.Phase_1_Dices && <DiceZone />}
                    {game.phase === GamePhase.Phase_3_City_And_Monuments && 
                        <div className='game-phase-3'>
                            <div className='still-to-use'>
                                {this.props.ui.availableWorkers}
                            </div>
                            <Button 
                                className='game-phase-3-btn'
                                variant="raised" 
                                color="primary"
                                onClick={() => this.props.game.step3(this.props.ui.result)}
                            >
                                Skip
                            </Button>
                        </div>
                    }
                    {game.phase === GamePhase.Phase_4_Developement && 
                        <div className='game-phase-4'>
                            <div className='still-to-use'>                        
                                {this.props.ui.currentMoney}
                            </div>
                            <Button 
                                className='game-phase-4-btn'
                                variant="raised" 
                                color="primary"
                                onClick={() => this.props.game.step4()}
                            >
                                Skip
                            </Button>
                        </div>
                        
                    }
                    {game.phase === GamePhase.Phase_5_Discard_Resources && 
                        <div className='game-phase-5'>
                            <div className={'resources-stock-size resources-stock-size-' + (game.stock.isLegalAtEndOfTurn() ? 'ok' : 'not-ok')}>
                                {game.stock.nbResources}
                            </div>
                            <Button
                                variant="raised" 
                                color="primary"
                                disabled={!game.stock.isLegalAtEndOfTurn()}
                                onClick={this.handleEndTurn}
                            >
                                End turn
                            </Button>
                        </div>
                    }
                </div>
                <div className='game-parts'>
                    <div className='game-parts-elt'>                
                        <City />                                
                        <Stocks />
                    </div>
                    <div className='game-parts-elt'>
                        <Monuments />
                    </div>
                    <div className='game-parts-elt'>                
                        <Developements />
                    </div>
                </div>
            </div>
        );
    }
}

export default Game;
